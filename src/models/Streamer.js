const { Schema, model } = require('mongoose');

const streamerSchema = new Schema({
    STREAMER_ID: {
        type: String,
        required: true,
    },
    STREAMER_NAME: {
        type: String,
        required: true,
    },
    LINK: {
        type: String,
        required: true,
    },
})

module.exports = model('Streamer', streamerSchema)