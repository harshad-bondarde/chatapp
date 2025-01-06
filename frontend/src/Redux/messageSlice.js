import { createSlice } from "@reduxjs/toolkit";

const messageSlice=createSlice({
    name:"message",
    initialState:{
        messages:[],
        loadingMessageContainer:false,
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages=action.payload
        },
        setLoadingMessageContainer:(state,action)=>{
            state.loadingMessageContainer=action.payload
        },
        deleteMessage:(state,action)=>{
            const messageId=action.payload;
            state.messages=state.messages.filter(message=>message._id!=messageId)
            // const index=state.messages.findIndex((msg)=>msg._id==messageId)
            // if(index!=-1)            
            // state.messages.splice(index,1);
        }
    }
})


export const { setMessages ,setLoadingMessageContainer ,deleteMessage}=messageSlice.actions

export default messageSlice.reducer