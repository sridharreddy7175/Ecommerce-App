import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
//import rootReducer from "./reducers";
import thunk from "redux-thunk";

import { UsersReducer } from "./modules/signin/signin_reducer";



const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
const rootStore = combineReducers({
  user: UsersReducer

});
const persistedReducer = persistReducer(persistConfig, rootStore);

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
let persistor = persistStore(store);
export { store, persistor };
