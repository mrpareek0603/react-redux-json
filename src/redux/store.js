import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
// Redux Thunk middleware allows you to write action creators 
// that return a function instead of an action.
import reduxThunk from "redux-thunk";
import rootReducer from "./root-reducer";

// this middleware will be applied to all the dispatch methods of the redux store
const middlewares = [reduxThunk];

//using logger in development environment
if(process.env.NODE_ENV === "development"){
    middlewares.push(logger)
}

//Creating a Redux store that will the state tree.
const store = createStore(rootReducer, applyMiddleware(...middlewares));
export default store;