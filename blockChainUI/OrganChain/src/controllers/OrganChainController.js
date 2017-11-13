import mongoose from 'mongoose';
import {
    appointmentSchema,
    hospitalInfoSchema,
    organInfoSchema,
    donorInfo,
    recepientInfo,
} from '..models/OrganChainSchema';

const Appointment = mongoose.model('Appointment', appointmentSchema);
const Hospital = mongoose.model('Hospital', hospitalInfoSchema);
const organ = mongoose.model('Organ', organInfoSchema);
const Donor = mongoose.model('Donor', donorInfo);
const Recepient = mongoose.model("Recepient", recepientInfo);

//Add Donor

//GET All Donors
//GET Donor by email

//Appointment
//POST Appointment 
//GET Appointment by userID


//Organ
//GET organ by donorId
//GET organ by organId. To be used by recepient 
//POST organ
export const 