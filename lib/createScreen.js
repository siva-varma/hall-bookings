const Screen = require('../models/Screen');
const Random = require('../helpers/Random');
let screens = global.screens;

module.exports = (req, res) => {
    let screenName = req.body.name;
    screens[screenName] = new Screen({
        name: screenName,
        seatInfo: req.body.seatInfo
    });
    let message = {
        screenName: screenName
    };

    console.log(screens);

    res.send({
        status: 0,
        message: message
    }, 201);
}