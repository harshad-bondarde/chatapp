import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"message",
    initialState:{
        messages:null,
        loadingMessageContainer:false,
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages=action.payload
        },
        setLoadingMessageContainer:(state,action)=>{
            state.loadingMessageContainer=action.payload
        }
    }
})


export const { setMessages ,setLoadingMessageContainer }=messageSlice.actions

export default messageSlice.reducer