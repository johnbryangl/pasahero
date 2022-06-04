const bcrypt = require('bcrypt');
const Errors = require('http-errors');

const { Users } = require('~/models');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');

exports.getAll = async (userPayload) => {
  try {
    const result = await Users.findAll();
    return result
  } catch (err) {
    console.log(`[Users Service]: users.service.getAll - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

exports.get = async (userPayload, userId) => {
  try {
    const result = await Users.findByPk(userId);
    if (!result) {
      throw new Errors(HTTP_STATUS.NotFoundError, ERROR_MESSAGE.ERR4001007);
    }
    return result
  } catch (err) {
    console.log(`[Users Service]: users.service.get - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};

exports.add = async (userPayload, userDetails) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);

    userDetails.password = hashedPassword;

    const result = await Users.create(userDetails);
    return result
  } catch (err) {
    console.log(`[Users Service]: users.service.add - ERROR \n ${err.message} \n ${err.stack}`);
    
    if (err.name === 'SequelizeValidationError') {
      throw new Errors(HTTP_STATUS.BadRequestError, ERROR_MESSAGE.ERR4001002);
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      throw new Errors(HTTP_STATUS.BadRequestError, ERROR_MESSAGE.ERR4001006);
    }

    throw err;
  }
};

exports.update = async (userPayload, userId, updatedUserDetails) => {
  try {
    if (updatedUserDetails.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(updatedUserDetails.password, salt);

      updatedUserDetails.password = hashedPassword;
    }

    const result = await Users.update(updatedUserDetails, {
      where: {
        id: userId
      }
    });
    return result
  } catch (err) {
    console.log(`[Users Service]: users.service.update - ERROR \n ${err.message} \n ${err.stack}`)
    
    if (err.name === 'SequelizeValidationError') {
      throw new Errors(HTTP_STATUS.BadRequestError, ERROR_MESSAGE.ERR4001002);
    } else if (err.name === 'SequelizeUniqueConstraintError') {
      throw new Errors(HTTP_STATUS.BadRequestError, ERROR_MESSAGE.ERR4001006);
    }

    throw err;
  }
}

exports.delete = async (userPayload, userId) => {
  try {
    const result = await Users.destroy({
      where: {
        id: userId
      }
    });

    return result
  } catch (err) {
    console.log(`[Users Service]: users.service.delete - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
}
