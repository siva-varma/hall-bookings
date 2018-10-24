
module.exports = class Screen {
    constructor(data) {
        const schema = {
            name: data.name || '',
            seatInfo: this.prepareSeatInfo(data.seatInfo || {})
        }
        for (const attribute in schema) {
            if (schema.hasOwnProperty(attribute)) {
                this[attribute] = schema[attribute];
            }
        }
    }

    //This function Prepares SeatInfo to be hold in the particular Screen
    prepareSeatInfo(seatInfo) {
        let preparedSeatInfo = {};

        for (const key in seatInfo) {
            if (seatInfo.hasOwnProperty(key)) {
                const row = seatInfo[key];
                row.numberOfSeats = row.numberOfSeats || 0;
                row.aisleSeats = row.aisleSeats || [];
                preparedSeatInfo[key] = row;
            }
        }
        return preparedSeatInfo;
    }
}