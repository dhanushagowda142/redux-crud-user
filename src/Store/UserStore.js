import { configureStore } from "@reduxjs/toolkit"
import userReducer from "../Reducers/UserReducer"

const AppStore = configureStore({
    reducer: userReducer,
    devTools: true
})

export default AppStore;