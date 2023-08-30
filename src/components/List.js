import {
    Link
  } from "react-router-dom";
import './Detail.css';

function List({ shoes }){
    return(
        <>
            <div>
                <ul className='product-list'>
                    {shoes.map(info => 
                        <li key={info.id}><Link to={`/detail/${info.id}`}>Product {info.id}</Link></li>    
                    )}
                </ul>
            </div>
        </>
    )
}

export default List;