import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import messageReducer from "./messageSlice"
import socketReducer from './socketSlice'

const store=configureStore({
    reducer:{
        user:userReducer,
        message:messageReducer,
        socket:socketReducer
    }
})

// export default store;

// const persistConfig = {
//     key: "root",
//     storage,
// };

// const rootReducers=combineReducers({
//     user:userReducer,
//     message:messageReducer,
//     socket:socketReducer
// })

// const persistedReducer = persistReducer(persistConfig, rootReducers);

// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//             },
//         }),
// });

// const persistor = persistStore(store);

// export { store, persistor };
export {store}