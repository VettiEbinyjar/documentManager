const documentModel = require('./documentModel');

let documentModelMethods = {}

documentModelMethods.uploadFiles = async (fileData) => {
    return await documentModel.insertMany(fileData)
}
documentModelMethods.findFilesByTags = async (arrayOfTags) => {
    let documentQuery = {
        tags: { $in: arrayOfTags }
    }
    return await documentModel.find(documentQuery)
}
module.exports = documentModelMethods