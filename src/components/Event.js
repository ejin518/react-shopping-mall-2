import React from 'react';
import { Outlet } from 'react-router-dom';

function Event() {
    return(
        <>
            <div>
                <h3>오늘의 이벤트</h3>
                <Outlet></Outlet>
            </div>
        </>
    )
}

export default Event