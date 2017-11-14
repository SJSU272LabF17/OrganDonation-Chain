Donor API:

creating a new Donor
localhost:3001/donor
Method: POST
Payload: {    
    "name" : "Chirag",
    "age" : 50,
    "email": "abc@gmail.com",
    "phone": 111111111,
    "address" : {
        "street": "abc",
        "line2": "String",
        "city": "san jose",
        "state": "CA",
        "zip": 95112
    },
    "password": "abcde"
}

Response : 
[
    {
        "_id": "5a0a55a18f778f15c48c2359",
        "name": "Chirag",
        "age": 50,
        "email": "abc@gmail.com",
        "phone": 111111111,
        "password": "abcde",
        "__v": 0
    }
]


Getting all the donors info
URL : localhost:3001/donor
Response : 
[
    {
        "_id": "5a0a55a18f778f15c48c2359",
        "name": "Chirag",
        "age": 50,
        "email": "abc@gmail.com",
        "phone": 111111111,
        "password": "abcde",
        "__v": 0
    }
]

