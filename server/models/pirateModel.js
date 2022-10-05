const mongoose = require('mongoose');

const pirateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    noOfChests: {
        type: String,
        required: true
    },
    phrase: {
        type: String,
        required: true
    },
    crewPosition: {
        type: String,
        required: true
    },
    pegLeg: {
        type: Boolean,
        required: true
    },
    eyePatch: {
        type: Boolean,
        required: true
    },
    hookHand: {
        type: Boolean,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

}, { timestamps: true }
);

const pirateModel = new mongoose.model('Pirate', pirateSchema);
module.exports = pirateModel;
