import { combineReducers } from "redux";
import { createStore } from 'redux';
import { incrementa1, incrementaParam } from './reducer'


const reducers = combineReducers({
    newValue: incrementa1,
    newValueParam: incrementaParam
});

export default createStore(reducers);