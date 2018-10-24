
module.exports = class Show {
    constructor(screen) {
        const schema = {
            name: screen.name,
            seatInfo: screen.seatInfo,
            reserved: this.initReservedSeats(screen.seatInfo), //Hold the Reserved Seats Data
            available: this.initAvailableSeats(screen.seatInfo) // Holds the Avaliable seats Data
        }

        for (const attribute in schema) {
            if (schema.hasOwnProperty(attribute)) {
                this[attribute] = schema[attribute];
            }
        }
    }

    initReservedSeats(seatInfo) {
        let reservedSeats = {};

        for (const key in seatInfo) {
            if (seatInfo.hasOwnProperty(key)) {
                reservedSeats[key] = [];
            }
        }
        return reservedSeats;
    }


    /*This function splits the given Number of Seats and Aisle seats and constructs the srray which holds the Avalable Seats.
    lets say we have NumberOfSeats = 10 i.e. 0-9 Seats and [0,5,6,9] as aisle seats then the Object constructed will be
    [[0,1,2,3,4,5][6,7,8,9]]
    */
    initAvailableSeats(seatInfo) {
        let availableSeats = {};

        for (const key in seatInfo) {
            if (seatInfo.hasOwnProperty(key)) {
                const row = seatInfo[key];
                let seats = [...Array(row.numberOfSeats || 0).keys()];
                let aisles = row.aisleSeats || [];
                let available = [];
                if (!aisles.includes(0)) {
                    aisles.splice(0, 0, 0);
                }
                if (!aisles.includes(row.numberOfSeats - 1)) {
                    aisles.push(row.numberOfSeats - 1);
                }
                let originalAisles = [];
                for (let i=0; i < aisles.length; i++) {
                    let aisle = aisles[i];
                    if (aisle !== 0 || aisle !== row.numberOfSeats - 1) {
                        originalAisles.push(aisle);
                        if (aisle > 0 && aisle + 1 < row.numberOfSeats - 1) {
                            originalAisles.push(aisle + 1);
                            if (aisles.includes(aisle + 1)) {
                                i++;
                            }
                        }
                    } else {
                        originalAisles.push(aisle);
                    }
                }
                if (row.numberOfSeats === 1) {
                    available[0] = [0];
                } else {
                    while (originalAisles.length > 0) {
                        let j = originalAisles.pop() + 1;
                        let i = originalAisles.pop();
                        let insert = seats.splice(i, j);
                        available.splice(0, 0, insert);
                    }
                }
                availableSeats[key] = available;
            }
        }
        return availableSeats;
    }
}