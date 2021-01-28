module.exports = {
  OK: {
    status: 200,
    message: "Ok",
  },
  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal Server Error",
  },
  CONFLICT: {
    status: 409,
    message: "Resource Already Exists",
  },
  BAD_REQUEST: {
    status: 400,
    message: "Bad Request",
  },

  FORBIDDEN: {
    status: 403,
    message: "Forbidden",
  },
  NOT_FOUND: {
    status: 404,
    message: "Not Found",
  },
  FILE_PARSE_FAILURE: {
    status: 422,
    message: "Form parse error",
  }
};
