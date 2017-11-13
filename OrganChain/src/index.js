import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import routes from './src/routes/OrganChainRoutes';
const app = express();
const PORT = 7000;