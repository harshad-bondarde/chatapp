import { createSlice } from "@reduxjs/toolkit"
const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
        searchedUsers:[],
        contacts:[],
        onlineUsers:null,

        groups:[],
        selectedGroup:null,
        addGroupInfo:{
            groupName:"",
            addMembers:true,
            selectedMembers:[]
        },
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
        } ,


        setGroups:(state,action)=>{
            state.groups=action.payload
        } ,
        setSelectedGroup:(state,action)=>{
            state.selectedGroup=action.payload
        },  
        addGroup:(state,action)=>{
            state.groups.push(action.payload)
        },
        setAllowewdToAddMembers:(state,action)=>{
            const data=action.payload
            state.addGroupInfo.addMembers=data.flag
            state.addGroupInfo.groupName=data.groupName
        } ,
        setSelectedMembers:(state,action)=>{
            state.addGroupInfo.selectedMembers.push(action.payload)
        } ,
        deselectMember:(state,action)=>{
            state.addGroupInfo.selectedMembers=state.addGroupInfo.selectedMembers.filter(member=>member._id!=action.payload)
        }
    
    }
})

export const { setAuthUser ,
               setOtherUsers , 
               setSelectedUser ,
               setSearchedUsers ,
               setOnlineUsers ,
               setContacts ,
               deleteFromContact ,
               
               setGroups ,
               addGroup, //for groups
               setAllowewdToAddMembers ,
               setSelectedMembers ,
               setSelectedGroup
            
            }=userSlice.actions

export default userSlice.reducer