import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from "react-redux"
import { changeName, changeAge } from '../store/userSlice.js';
import { changeStock, minusStock, removeItem } from '../store';


function Cart() {
    let products = useSelector((state)=>{ return state })
    let dispatch = useDispatch();
    return(
        <>
        {products.user.name}의 장바구니
        나이 : {products.user.age}
        <button onClick={()=>{
                            dispatch(changeAge(100))
                        }}>Button</button>
           <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                </tr>
            </thead>
            <tbody>
                {products.cart.map((item, index) => {
                    return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{item.name}</td>
                        <td>{item.count}</td>
                        <td><button value={item.id} onClick={(event)=>{
                            dispatch(changeStock(event.target.value))
                        }}>+</button>
                        <button value={item.id} onClick={(event)=>{
                            dispatch(minusStock(event.target.value))
                        }}>-</button>
                        <button value={item.id} onClick={()=>{
                            dispatch(removeItem(item))
                        }}>삭제</button>
                        </td>
                    </tr>
                    )  
                })}   
            </tbody>
        </Table>
        </>
    )
}

export default Cart;