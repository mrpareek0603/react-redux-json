import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
// Redux Thunk middleware allows you to write action creators 
// that return a function instead of an action.
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reducer";

const middlewares = [reduxThunk];

if(process.env.NODE_ENV === "development"){
    middlewares.push(logger)
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;