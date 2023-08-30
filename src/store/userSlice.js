import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState: { name: 'kim', age : 20 },
    reducers : {
        changeName(state) {
            state.name = 'park';
        },
        changeAge(state, a) {
            state.age += a.payload
        }
    }
})

export let {changeName} = user.actions;
export let {changeAge} = user.actions;

export default user