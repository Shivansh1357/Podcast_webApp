import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./Slices/userSlice";
import podcastsReducer from "./Slices/podcastsSlice"
export default configureStore({
    reducer:{
        user:userReducer,
        podcasts:podcastsReducer,
    },
});