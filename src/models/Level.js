const { Schema, model } = require('mongoose');

const levelSchema = new Schema({
    USER_ID: {
        type: String,
        required: true,
    },
    GUILD_ID: {
        type: String,
        required: true,
    },
    XP: {
        type: Number,
        default: 0,
    },
    LEVEL: {
        type: Number,
        default: 0,
    }
})

module.exports = model('Level', levelSchema)