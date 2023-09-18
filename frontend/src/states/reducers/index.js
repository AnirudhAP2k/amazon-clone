import { combineReducers } from 'redux';
import itemReducer from './itemReducer.js';

const reducers = combineReducers({
    items: itemReducer
})
 export default reducers;