let express = require('express');
let documentConrtroller = require('../controllers/documentConrtroller');
const fs = require('fs');
const documentRouter = express.Router();

documentRouter.post('/upload', (request, response) => {
    documentConrtroller.uploadDocuments(request.body).then((result) => {
        console.log(result);
        response.status(result.status).render("files", result)
    }).catch((err) => {
        console.log(err);
        response.status(501).json(err)

    })

})

documentRouter.get('/retrive', (request, response) => {
    let arrayOfTags = request.query.tags
    console.log(arrayOfTags);
    documentConrtroller.retriveFilesByTags(arrayOfTags).then((result) => {
        response.status(result.status).render("files", result)
    }).catch((err) => {
        console.log(err);
        response.status(500).json(err)

    })
})


module.exports = documentRouter;
