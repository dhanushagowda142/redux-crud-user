import { createAsyncThunk } from '@reduxjs/toolkit'
import UserApi from '../API/UserApi'

// createAsyncThunk(action const, callback function)
// create action
export const createUsers = createAsyncThunk("user/create", async (user) => {
    //  console.log('action =',user)
    let res = await UserApi.createUser(user)
    return res.data
})
// read all options
export const retriveUsers = createAsyncThunk("user/read", async () => {
    const res = await UserApi.readAll()
    console.log(`reducer res =`, res.data)
    return res.data.users
})
// read single action
export const retriveSingleUser = createAsyncThunk("user/read/single", async ({id}) => {
    
})
// update action
export const updateUser = createAsyncThunk("user/update", async ({id,user}) => {
    
})
// delete action 
export const deleteUser = createAsyncThunk("user/delete", async (id) => {
    let res = await UserApi.deleteUser(id);
    return{
        ...res.data,
        id:id
    }
    
})