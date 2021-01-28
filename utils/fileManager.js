const fs = require("fs");

exports.renameFile = (path, newPath) =>
  new Promise((resolve, reject) => {
    fs.rename(path, newPath, (err) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(newPath);
    });
  });

exports.deleteFile = (path) =>
  new Promise((resolve, reject) => {
    console.log("inside delete file");
    fs.unlink(path, (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          // !might be because the file is deleted in local file system manually.
          console.log({ ...err, status: `${path} - file already deleted` });
          return resolve();
        } else return reject(err);
      } else return resolve("file deleted");
    });
  });
