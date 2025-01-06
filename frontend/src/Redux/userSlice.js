import { createSlice } from "@reduxjs/toolkit"
const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        searchedUsers:[],
        contacts:[],
        onlineUsers:null
    },
    reducers:{
        setAuthUser:(state,action)=>{
            state.authUser=action.payload;

        },

        setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload
        },

        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload
        },

        setSearchedUsers:(state,action)=>{
            state.searchedUsers=action.payload
        },
        
        setOnlineUsers:(state,action)=>{
            state.onlineUsers=action.payload
        },

        setContacts:(state,action)=>{
            state.contacts=action.payload
        },

        deleteFromContact:(state,action)=>{
            const userToDelete=action.payload
            state.contacts=state.contacts.filter(user=>user._id!=userToDelete._id)
        }

        

    }
})

export const { setAuthUser ,
               setOtherUsers , 
               setSelectedUser ,
               setSearchedUsers ,
               setOnlineUsers ,
               setContacts ,
               deleteFromContact
            }=userSlice.actions

export default userSlice.reducer