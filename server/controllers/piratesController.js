const Pirate = require('../models/pirateModel');

exports.getPirateByUserID = async (req, res) => {
    await Pirate.find({ user: req.params.id }).populate('user').exec((err, result) => {
        if (result) {
            return res.status(200).json(result);
        }
        else {
            return res.status(404).json({ errorMessage: 'No Pirates found' });
        }
    });
}

exports.getPirateById = async (req, res) => {
    await Pirate.findOne({ _id: req.params.id }).populate('user').exec((err, result) => {
        if (result) {
            return res.status(200).json(result);
        }
        else {
            return res.status(404).json({ errorMessage: 'No Pirates found' });
        }
    });
}

exports.addPirate = async (req, res) => {
    const pirate = new Pirate({
        user: req.user._id,
        name: req.body.name,
        imgUrl: req.body.imgUrl,
        noOfChests: req.body.noOfChests,
        phrase: req.body.phrase,
        crewPosition: req.body.crewPosition,
        pegLeg: req.body.pegLeg,
        eyePatch: req.body.eyePatch,
        hookHand: req.body.hookHand,
    });

    const savePirate = await pirate.save();
    if (savePirate) {
        res.status(200).json({ successMessage: 'Pirate added successfuly!' });
    } else {
        res.status(400).json({ errorMessage: 'Pirate not added. Please try again' });
    }
}

exports.updatePirate = async (req, res) => {
    const pirate = await Pirate.findOne({ _id: req.params.id });
    if (pirate) {
        if (req.body.data === "pegLeg") {
            pirate.pegLeg = !pirate.pegLeg;
        }
        if (req.body.data === "eyePatch") {
            pirate.eyePatch = !pirate.eyePatch;
        }
        if (req.body.data === "hookHand") {
            pirate.hookHand = !pirate.hookHand;
        }

        const savePirate = await pirate.save();
        if (savePirate) {
            res.status(200).json({ successMessage: 'Pirate updated successfuly!' });
        } else {
            res.status(400).json({ errorMessage: 'Pirate not updates. Please try again' });
        }
    }
    else {
        res.status(404).json({ errorMessage: 'No pirate found!' });
    }
}

exports.deletePirate = async (req, res) => {
    const pirate = await Pirate.findOne({ _id: req.params.id });
    if (pirate) {
        pirate.remove();
        res.status(200).json({ successMessage: 'Pirate deleted successfuly!' });
    }
    else {
        res.status(404).json({ errorMessage: 'No pirate found!' });
    }
}