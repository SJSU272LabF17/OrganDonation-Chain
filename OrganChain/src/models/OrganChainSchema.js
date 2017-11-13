import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export  const appointmentSchema = new Schema({
    date: Date,
    sourceHospital: String,
    userID: Number,
    organ: String,     //If you know how to use enum, do that.
    status: String,       //active or inactive
    type:String     //testing or transplant
});

export const hospitalInfoSchema = new Schema({
    hospitalId : Number,
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
    id: Number,
    donorId:Number,
    organTestInfo:String,
    sourceHospital:Number,
    targetHospital:String
});

export const donorInfo = new Schema({
    id: Number,
    name : String,
    donorId: Number,
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
    recepientId : Number,
    name:String,
    age:Number,
    organ:String,
    hospital:Number,
    email:String,
    phone:Number,
    lab:String,
    allotedOrganId:Number,   //null by default
    address:{
        street:String,
        line2:String,
        city:String,
        state:String,
        zip:number
    }
})
