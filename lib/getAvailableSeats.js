const Show = require('../models/Show');
let screens = global.screens;
let shows = global.shows;
module.exports = (req, res) => {
    let screenName = req.query.name;
    let status = req.query.status || '';
    let numSeats = req.query.numSeats || 0;
    let choice = req.query.choice || '';

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
    } else if(status === 'unreserved') {
        if (!shows.hasOwnProperty(screenName)) {
            shows[screenName] = new Show(screens[screenName]);
        }
        let available = shows[screenName].available;
        seats = {};
        for (const key in available) {
            if (available.hasOwnProperty(key)) {
                seats[key] = available[key].toString().split(',');
            }
        }
        res.send({
            status: 0,
            message: {
                seats
            }
        }, 200);
    } else if (numSeats !== 0 && choice !== '') {
        numSeats = parseInt(numSeats, 10);
        let row = choice.substring(0,1);
        let seatNumber = parseInt(choice.substring(1), 10);
        let available = shows[screenName].available;
        let indices = indexFinder(available[row] || [], seatNumber);
        if (!indices.includes(-1)) {
            let block = available[row][indices[0]];
            let count = 1;
            let seats = [seatNumber];
            for (let i=seatNumber-1; i>0; i--) {
                if (block.includes(i)) {
                    seats.push(i)
                    count++;
                } else {
                    break;
                }
                if (count === numSeats) {
                    break;
                }
            }
            let send = function(row, seats) {
                
                res.send({
                    status: 0,
                    message: {
                        availableSeats: {
                            [row]: [seats.sort()]
                        }
                    }
                });
            }
            if (count === numSeats) {
                send(row, seats);
            }
            for (let i=seatNumber+1; count<numSeats; i++) {
                if (block.includes(i)) {
                    seats.push(i)
                    count++;
                } else {
                    break;
                }
                if (count === numSeats) {
                    break;
                }
            }
            if (count === numSeats) {
                send(row, seats);
            } else {
                res.send({
                    status: -1,
                    message: 'Seats are not available!'
                }, 404);
            }

        } else {
            res.send({
                status: -1,
                message: 'Seats are not available!'
            }, 404);
        }
        
    } else {
        res.send({
            status: 0,
            message: 'Invalid query!'
        }, 200);
    }
}