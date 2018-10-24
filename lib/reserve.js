
const Show = require('../models/Show');

let screens = global.screens;
let shows = global.shows;

module.exports = (req, res) => {
    let screenName = req.query.name;
    let seats = req.body.seats;

    //This finds the index of an given Number in the subarray and the index of the parent array and returns it.
    let indexFinder = function(array, number) {
        let innerIndex;
        let indexOfRemainingArray = array.findIndex(function(sub) {
            innerIndex = sub.indexOf(number);
            return innerIndex !== -1;
        });
        return [indexOfRemainingArray, innerIndex];
    }
    
    if (!screens.hasOwnProperty(screenName)) {
        res.sendError({
            status: -1,
            message: 'Screen Not Found!'
        }, 404);
    } else {
        if (!shows.hasOwnProperty(screenName)) {
            shows[screenName] = new Show(screens[screenName]);
        }
        let available = shows[screenName].available;
        seatsAvailable = true;
        seatsToBeReserved = [];
        for (const key in seats) {
            if (seats.hasOwnProperty(key)) {
                const row = seats[key];
                for (const seatNumber of row) {
                    let indices = indexFinder(available[key] || [], seatNumber);
                    if (!indices.includes(-1)) {
                        seatsToBeReserved.push([key, seatNumber]);
                    } else {
                        seatsAvailable = false;
                        break;
                    }
                }
            }
        }

        if (seatsAvailable) {
            for (const seat of seatsToBeReserved) {
                let available = shows[screenName].available;
                let indices = indexFinder(available[seat[0]] || [], seat[1]);
                let seatNumber = shows[screenName].available[seat[0]][indices[0]].splice(indices[1], 1);
                shows[screenName].reserved[seat[0]].push(seatNumber);
            }
            res.send({
                status: 0,
                message: 'Seats are Reserved!'
            }, 200)
        } else {
            res.send({
                status: -1,
                message: 'Seats are not available!'
            }, 404);
        }
    }
    
}