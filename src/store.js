import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice.js'



let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})

let cart = createSlice({
    name: 'cart',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeStock(state, action) {
            state.forEach(item => {
                if(String(item.id) === action.payload) {
                    item.count += 1;
                }
            })
        },
        minusStock(state, action) {
            state.forEach(item => {
                if(String(item.id) === action.payload) {
                    if(item.count > 0){
                        item.count -= 1;
                    }
                }
            })
        },
        removeItem(state, item) {
            let a = {id : item.payload.id, name : item.payload.title, count : 1};
            let deletedItem = state.find(obj => obj.id === item.payload.id);
            if(deletedItem){
                state.splice(a, 1);
            }
        },
        getInfo(state, info) {
            let a = {id : info.payload.id, name : info.payload.title, count : 1};
            let item = state.find(obj => obj.id === info.payload.id);
            if(item){
                item.count += 1 ;
            }else{
                state.push(a);
            } 
            // console.log(item);   
        }
    }
});
// let watched = createSlice({
//     name: 'watched',
//     initialState : [],
//     reducers: {
//         recentlyWatched(state, action){
//             if(action.payload){
//                 state.push(action.payload);
//             }
//         }
//     }
// })
export let {changeStock, minusStock, removeItem, getInfo} = cart.actions
// export let {recentlyWatched} = watched.actions

export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
    // watched : watched.reducer
  }
})