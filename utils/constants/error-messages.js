const ERROR_MESSAGE = {
  ERR5001001: { message: { title: 'Server Error', description: 'A server error has occurred which failed to fulfill the request. Please try again or contact the administrator.' } },
  
  ERR4001001: { message: { title: 'Invalid Credentials', description: 'The email or password is incorrect.' } },
  ERR4001002: { message: { title: 'Validation Error', description: 'Some details might be invalid or incomplete. Kindly verify your inputs.' } },
  ERR4001003: { message: { title: 'Forbidden - Access Denied', description: 'You are not allowed to access this resource.' } },
  ERR4001004: { message: { title: 'Token Expired', description: 'The access token provided has expired. Please log in again.' } },
  ERR4001005: { message: { title: 'No Access Token', description: 'The access token is either missing or invalid.' } },
  ERR4001006: { message: { title: 'Email or Phone Number Taken', description: 'An account with the same email or phone number is already taken.' } },

  ERR4001007: { message: { title: 'Not Found', description: 'The requested information does not exist.' } },

  ERR4001008: { message: { title: 'No Tickets', description: 'This booking has no tickets, kindly add a ticket.' } },
  ERR4001009: { message: { title: 'Insufficient Funds', description: 'Kindly load your PayPal wallet to proceed with the transaction.' } },
  ERR4001010: { message: { title: 'Invalid Booking Tickets - Expired', description: 'This ticket booking has expired.' } },
  ERR4001011: { message: { title: 'Invalid Booking Tickets - Wrong Bus', description: 'This ticket booking does not belong to this bus.' } },
};

module.exports = { ERROR_MESSAGE };