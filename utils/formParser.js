const formidable = require("formidable");
const { FILE_PARSE_FAILURE } = require("../constants/httpStatus");
const formOptions = {
  maxFileSize: 10 * 2000 * 2000,
};

const formParser = {};

formParser.parseForm = (request, options = formOptions) => {
  const form = new formidable.IncomingForm(formidable);
  form.maxFileSize = options.maxFileSize;
  return new Promise((resolve, reject) => {
    form.parse(request, (err, fields, files) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve({ fields, files });
    });
  });
};

formParser.formidable = (request, response, next) => {
  const contentType = request.headers["content-type"];
  if (!contentType || contentType.startsWith("multipart/form-data")) {
    const form = new formidable.IncomingForm({multiples: true});
    form.parse(request, (err, fields, files) => {
      if (err) response.status(FILE_PARSE_FAILURE.status).json(FILE_PARSE_FAILURE);
      else {
        // console.log(files,fields);
        request.body = { fields, files };
        return next();
      }
    });
  } else next();
};

module.exports = formParser;
