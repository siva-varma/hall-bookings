# Implementing Ticket Booking sample API's

These are the API's Ticket Booking system for movie screens with in-memory data and developed with an framework developed from scratch using TCP network library.

# Implementing HTTP protocol using TCP network library

A TCP network library 'net' in nodejs is used to implement HTTP protocol.s

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
1. node
```

## Running the tests

Run application using below command

```
PORT=9090 node app.js
```

By executing above command, server will be up and listening. Below listed endpoints will be working:

```
1.  GET     /
2.  PUT     /screens
3.  POST    /screens/{screen‑name}/reserve
4.  GET     /screens/{screen‑name}/seats?status=unreserved
5.  GET    /screens/{screen‑name}/seats?numSeats={x}&choice= {seat‑row‑and‑number}
```
# Screen [/screens]

## PUT Request

>>This API is for providing the data of a movie screen like **ScreenName** and **SeatingInfo** to the system.

Request Body
```
{
    "name": "imax",
    "seatInfo": {
        "A": {
            "numberOfSeats": 10,
            "aisleSeats": [
                0,
                5,
                6,
                9
            ]
        },
        "B": {
            "numberOfSeats": 15,
            "aisleSeats": [
                0,
                5,
                6,
                9
            ]
        },
        "D": {
            "numberOfSeats": 20,
            "aisleSeats": [
                0,
                5,
                6,
                9
            ]
        }
    }
}
```
Response Body
```
{
    "status": 0,
    "message": {
        "screenName": "imax"
    }
}
```

# Screen_Reserve [/screens/{screen‑name}/reserve]

## POST Request

>>This API is for reserving seats for a screen provided the  screenName and the seats to be reserved to the system.

Request Params:
* **screen-name** which is passed in URL

Request Body
```
{
    "seats": {
        "A": [
            3,4
        ]
    }
}
```

Response Body (Success)
```
{
    "status": 0,
    "message": "Seats are Reserved!"
}
```

Response Body (Failure on Unavailable Seats)
```
{
    "status": -1,
    "message": "Seats are not available!"
}
```

# Screen_Available [/screens/{screen‑name}/seats?status=unreserved]

## GET Request

>>This API is for searching the available seats given the screenName

Request Params:

* **screen-name** which is passed in URL

* **status** which is a query param and can be passed as "unreserved"

Response Body (Success)
```
{
    "status": 0,
    "message": {
        "seats": {
            "A": [
                "0",
                "1",
                "2",
                "5",
                "6",
                "7",
                "8",
                "9"
            ],
            "B": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14"
            ],
            "D": [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19"
            ]
        }
    }
}
```

Response Body (Failure on Unavailable Screen)
```
{
    "status": -1,
    "message": "Screen Not Found!"
}
```

# Screen_Available_Position [/screens/{screen‑name}/seats?numSeats={x}&choice= {seat‑row‑and‑number}]

## GET Request

>>This API is for Available seats given a screenName,Number_of_Sests and Desired_Position

Request Params:

* **screen-name** which is passed in URL

* **numSeats** which is a query param for Number_Of_Seats

* **choice** which is a query param and has 2 parts
>* Seat-Raw
>* Seat-Number
>* Example like A4 which means Raw "A" and seatNumber 4

Response Body (Success)
```
{
    "status": 0,
    "message": {
        "availableSeats": {
            "A": [
                [
                    1,
                    2
                ]
            ]
        }
    }
}
```

Response Body (Failure on Unavailablity of Continious Seats)
```
{
    "status": -1,
    "message": "Seats are not available!"
}
```