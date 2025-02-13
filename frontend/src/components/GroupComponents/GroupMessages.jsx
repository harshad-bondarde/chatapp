import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useGetGroupMessages from '../../hooks/useGetGroupMessages'

const GroupMessages = ({messages}) => {
    const dispatch=useDispatch()
    const {selectedGroup}=useSelector(state=>state.user)     
    const {loadingMessageContainer}=useSelector(state=>state.message)
    useGetGroupMessages()
    return (
        <div>
            
        </div>
    )
}

export default GroupMessages
