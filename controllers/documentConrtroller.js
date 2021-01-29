const documentModelMethods = require('../models/document/index');
const documentConrtroller = {}
const statuCode = require('../constants/httpStatus');
const fileHandler = require('../utils/fileManager');
let path = require('path');
let shortid = require('shortid');
documentConrtroller.uploadDocuments = async (reqData) => {
    let { fields, files } = reqData
    let documents = (files.file && Array.isArray(files.file)) ? files.file : [files.file]
    let tags = (fields.tags && Array.isArray(fields)) ? fields.tags : fields.tags.split(",")
    let listOfFiles = await documents.map((oneDoc) => {
        let newPath = path.resolve(__dirname, "..", "public", shortid.generate() + oneDoc.name)

        // fileHandler.renameFile(oneDoc.path, newPath)
        let doc = {
            fileName: oneDoc.name,
            fileType: oneDoc.type,
            filePath: newPath,
            tags: tags

        }
        return doc
    })
    return new Promise((resolve, reject) => {
        return documentModelMethods.uploadFiles(listOfFiles).then((result) => {
            return resolve({ ...statuCode.OK, result })
        }).catch((err) => {
            console.log(err);
            return reject({ ...statuCode.INTERNAL_SERVER_ERROR })
        })
    })

}
documentConrtroller.retriveFilesByTags = (arrayOfTags) => {
    return new Promise((resolve, reject) => {
        let tags = (arrayOfTags && Array.isArray(arrayOfTags)) ? arrayOfTags : arrayOfTags.split(",")
        console.log(arrayOfTags && Array.isArray(arrayOfTags));
        console.log("LLLLL");
        console.log(tags);
        return documentModelMethods.findFilesByTags(tags).then((result) => {
            if (result) {
                return resolve({ ...statuCode.OK, result })

            } else {
                return reject({ ...statuCode.BAD_REQUEST })

            }
        }).catch((err) => {
            console.log(err);
            return reject({ ...statuCode.INTERNAL_SERVER_ERROR })
        })
    })

}
module.exports = documentConrtroller