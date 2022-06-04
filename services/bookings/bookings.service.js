const Errors = require('http-errors');
const { Users, Bookings, Tickets, LoopBusFares } = require('~/models');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');
const { sequelize } = require('~/models');
const QRCode = require('qrcode');

exports.getAll = async (userPayload) => {
  try {
    const result = await Bookings.findAll();
    return result
  } catch (err) {
    console.log(`[Bookings Service]: bookings.service.getAll - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

exports.get = async (userPayload, bookingId) => {
  try {
    const result = await Bookings.findByPk(bookingId);
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
    // calculate booking total
    for (let ticket of bookingDetails.tickets) {
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
      

      const booking = await Bookings.create(bookingDetails, {
        include: [Tickets],
        transaction: t
      });

      const qr = await QRCode.toString(JSON.stringify(
        { id: booking.id }
      ), { errorCorrectionLevel: 'H', type: 'svg' });
      
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
