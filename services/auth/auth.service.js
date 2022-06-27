const Errors = require('http-errors');
const bcrypt = require('bcrypt');
const { Users } = require('~/models');
const { signToken } = require('~/utils/helpers/jwt-functions');
const { HTTP_STATUS } = require('~/utils/constants/http-status-codes');
const { ERROR_MESSAGE } = require('~/utils/constants/error-messages');

exports.logIn = async (userId, password) => {
  try {
    const user = await Users.findByPk(userId);
    const hasCorrectCredentials = user ? await bcrypt.compare(password, user.password) : false;
    if (hasCorrectCredentials) {
      const userDetails = { id: user.id, role: user.role, loopBusId: user.loopBusId };
      const accessToken = await signToken(userDetails)
      
      userDetails.fullName = user.fullName

      return { accessToken, userDetails }
    } else {
      throw new Errors(HTTP_STATUS.UnauthorizedError, ERROR_MESSAGE.ERR4001001);
    }
  } catch (err) {
    console.log(`[Auth Service]: auth.service.logIn - ERROR \n ${err.message} \n ${err.stack}`)
    throw err;
  }
};
