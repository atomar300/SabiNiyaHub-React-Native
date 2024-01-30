import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './components/redux/userReducer';


const reducer = combineReducers({
  user : userReducer
});


let preloadedState = {

};


const store = configureStore({
  reducer, preloadedState,
});

export default store;