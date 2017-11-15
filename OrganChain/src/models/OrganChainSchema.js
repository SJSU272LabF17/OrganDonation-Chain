var mongo = require("./mongo.js");

const Schema = mongo.Schema;

export const appointmentSchema = new Schema({
    date: Date,
    sourceHospital: String, //In Transplant type this will be the destination hospitalId.
    userID: String,
    organ: String,     //If you know how to use enum, do that.
    status: String,       //active or inactive
    type: String     //testing or transplant
});

export const hospitalInfoSchema = new Schema({
    hospitalId : String,
    name : String,
    address : {
        street:String,
        line2:String,
        city: String,
        State: String,
        zip: Number
    },
    phone : Number,
    email : String,
    password : String
});

export const organInfoSchema = new Schema({
    name : String,
    id: String,
    donorId:String,
    organTestInfo:String,
    sourceHospital:String,
    targetHospital:String
});

export const donorInfo = new Schema({
    id: String,
    name : String,
    donorId: String,
    age : Number,
    organName: String,
    email:String,
    phone: Number,
    address : {
        street:String,
        line2:String,
        city:String,
        state:String,
        zip:Number
    },
    password:String
});

export const recepientInfo = new Schema({
    recepientId : String,
    name:String,
    age:Number,
    organ:String,
    hospitalId:String,
    email:String,
    phone:Number,
    lab:String,
    allotedOrganId:String,   //null by default
    address:{
        street:String,
        line2:String,
        city:String,
        state:String,
        zip:number
    }
})
