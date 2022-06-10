const Errors = require('http-errors');
const { Users, Bookings, Tickets, LoopBusFares } = require('~/models');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');
const { sequelize } = require('~/models');
const QRCode = require('qrcode');
const Hashids = require('hashids/cjs');
const hashids = new Hashids();

exports.getAll = async (userPayload) => {
  try {
    const result = await Bookings.findAll({ include: { all: true, nested: true } });
    return result
  } catch (err) {
    console.log(`[Bookings Service]: bookings.service.getAll - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

exports.get = async (userPayload, bookingId) => {
  try {
    const result = await Bookings.findByPk(bookingId, { include: { all: true, nested: true } });
    if (!result.isValid) {
      result.qr = ''
    }

    if (!result) {
      throw new Errors(HTTP_STATUS.NotFoundError, ERROR_MESSAGE.ERR4001007);
    }
    return result
  } catch (err) {
    console.log(`[Bookings Service]: bookings.service.get - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

exports.add = async (userPayload, bookingDetails) => {
  try {

    if (bookingDetails.tickets.length < 1) {
      throw new Errors(HTTP_STATUS.BadRequestError, ERROR_MESSAGE.ERR4001008);
    }
    // get user instance to check funds in later transaction
    const user = await Users.findByPk(userPayload.id);
    // get all fares
    const loopBusFares = await LoopBusFares.findAll({ raw: true });
    // initialize total to 0
    bookingDetails.total = 0;
    // remove tickets with 0 quantity
    const filteredTickets = bookingDetails.tickets.filter(ticket => ticket.quantity > 0)
    bookingDetails.tickets = filteredTickets
    // calculate booking total
    for (let ticket of bookingDetails.tickets) {
      ticket.loopBusFareId = ticket.id;
      delete ticket.id
      const loopBusFare = loopBusFares.find(fare => fare.id == ticket.loopBusFareId)
      let partialTotal = Number(ticket.quantity) * loopBusFare.fee
      bookingDetails.total += partialTotal
    }

    bookingDetails.userId = userPayload.id;

    const result = await sequelize.transaction(async (t) => {

      const updatedFunds = user.funds - bookingDetails.total;

      if (updatedFunds < 0) {
        throw new Errors(HTTP_STATUS.BadRequestError, ERROR_MESSAGE.ERR4001009);
      }

      // update user's balance
      await user.decrement('funds', { by: bookingDetails.total, transaction: t  });

      // create ticket booking
      bookingDetails.isPaid = true;
      bookingDetails.isValid = true;
      console.log(bookingDetails)

      const booking = await Bookings.create(bookingDetails, {
        include: [Tickets],
        transaction: t
      });

      const encryptedId = hashids.encode(booking.id);
      const qr = await QRCode.toDataURL(encryptedId, { errorCorrectionLevel: 'H', type: 'image/png' });
      // convert to sequelize scope
      await Bookings.update({ qr: qr }, { where: { id: booking.id }, transaction: t });

      return booking;
    });

    return result
  } catch (err) {
    console.log(`[Bookings Service]: bookings.service.add - ERROR \n ${err.message} \n ${err.stack}`);
    throw err;
  }
};
