import {applyMiddleware, createStore} from "redux"
import { createLogger } from "redux-logger"
import combineReducers from "./reducer"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

const middleWare = applyMiddleware(createLogger(), thunk, promise());

export default createStore(combineReducers, middleWare);