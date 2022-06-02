import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./rootReducer";

const middlewares = [composeWithDevTools()]
//composeWithDevTools() liên kết vs trình duyệt hiện các in4

const store = createStore(rootReducer,...middlewares);

export default store