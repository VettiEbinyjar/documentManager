const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
        },
        filePath: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            required: true
        },
    },
    {
        timestamps: true,
    }
);
const Document = mongoose.model('Documents', documentSchema);

module.exports = Document;
