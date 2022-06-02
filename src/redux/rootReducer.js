import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import workDateReducer from "./workDate/workDateReduce";

const rootReducer = combineReducers({
    users : userReducer,
    workDate: workDateReducer
})

export default rootReducer

//Hàm combineReducerstrợ giúp biến một đối tượng
// có giá trị là các hàm giảm khác nhau thành một hàm giảm duy nhất mà bạn có thể chuyển đến createStore.
//tức là khai báo nhiều loại reducer
//