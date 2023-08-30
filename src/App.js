import { lazy, Suspense, useState } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Container, Row, Col } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
// import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import axios from 'axios';
import styled from 'styled-components';
import Detail from './components/Detail';
import List from './components/List';
import Cart from './components/Cart';
const Event = lazy(() => import('./components/Event'));
const One = lazy(() => import('./components/One'));
const Two = lazy(() => import('./components/Two'));


function App() {
  // const obj = {name: 'kim'};
  // localStorage.setItem('data', JSON.stringify(obj));
  // let get = localStorage.getItem('data');
  // console.log(JSON.parse(get).name);
  const [shoes, setShoes] = useState(data);
  const [count, setCount] = useState(0);
  let navigate = useNavigate();
  let SeeMore = styled.div`
    text-align:center;
  `
  let Close = styled.div`
    text-align:center;
  `
  const getInfo = (data) => {
   var newArray = [...shoes, ...data];
     setShoes(newArray);
  }
  const getInfo2 = (data) => {
    var newArray = [...shoes, ...data];
      setShoes(newArray);
   }
   let result = useQuery('userName', ()=>{
    return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log('요청됨')
      return a.data
    })
    // {staleTime : 2000} //2초 안에는 refetch가 되지 않음.
   })

   
  //  useEffect(()=>{
  //   let watched = JSON.parse(localStorage.getItem('watched')) || [];
  //   if(!watched) {
  //     localStorage.setItem('watched', JSON.stringify([]))
  //   }
  //   setWatchedItems(watched);
    
  //  },[shoes])
  //  console.log(watchedItems);
  return (
    <>
    <div className="App">
        <Nav
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <Nav.Item>
          <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
          {/*navigate(-1) -1를 뒤로 한페이지 이동. 뒤로가기 버튼과 동일함 */}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  onClick={()=>{navigate('/about')}}>About</Nav.Link> 
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  onClick={()=>{navigate('/event')}}>Event</Nav.Link> 
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  onClick={()=>{navigate('/detail')}}>Detail</Nav.Link> 
          {/* <Link to="/detail">Detail</Link> Link를 사용할 수 있으나 a태그가 생성되기 때문에 보기 안좋음. useNavigate를 사용하여 페이지 이동을 대신할 수 있다.*/}
        </Nav.Item>
        <Nav.Item>
          <Nav.Link  onClick={()=>{navigate('/cart')}}>Cart</Nav.Link> 
        </Nav.Item>
      </Nav>
      <Nav className="ms-auto">반가워요
      { result.isLoading && '로딩중'}
      { result.error && '에러' }
      { result.data && result.data.name}
      </Nav>
    </div>
    <Routes>
        <Route path="/" element={
          <>
          <div className="main-bg"></div>
          {/* <div className="recent-item">
            <h3>Recently Viewed</h3>
            {watchedItems.map(item => (
              <Link to={`/detail/${item.id}`} key={item.id}>
                <div className="recent-item">
                  <img src={`https://codingapple1.github.io/shop/shoes${item.id + 1}.jpg`} alt={item.title} />
                  <p>{item.title}</p>
                </div>
              </Link>
            ))} 
          </div> */}
          <Container>
          <div className="pro-wrap">
            <Row>
              <Product detail={shoes}/>
            </Row>
          </div>
            {
              count === 1 ? <SeeMore>
              <button onClick={()=>{
                axios.get('https://codingapple1.github.io/shop/data3.json').then((data)=>{getInfo2(data.data)})
                .catch(() =>{
                  console.log('데이터 가져오기 실패');
                });
                setCount((current) => current + 1);
                // console.log(count); 
            }}>See More</button>
          </SeeMore>
              : (count === 0 ? <SeeMore>
                <button onClick={()=>{
                  axios.get('https://codingapple1.github.io/shop/data2.json').then((data)=>{getInfo(data.data)})
                  .catch(() =>{
                    console.log('데이터 가져오기 실패');
                  });
                  setCount((current) => current + 1);
                  // console.log(count);
              }}>See more</button>
            </SeeMore> : ( count === 2 ? <Close>
            <button onClick={()=>{
              setShoes(data);
              setCount(0);
            }}>Close</button>
          </Close> : null)
            )
            }
          </Container>
        </>
        }/> 
          <Route path="/detail/" element={ <List shoes={shoes} /> }/>
          <Route path="/detail/:id" element={ <Detail shoes={shoes} /> }/>
          {/* nested routes */}
          <Route path="/about" element={ <Suspense fallback={<p>loading..</p>}><About /></Suspense> }>
            {/* Routes 전체를 Suspense로 감싸도 됨 */}
            <Route path="member" element={ <div>멤버임</div> }/>
            <Route path="location" element={ <div>위치</div> }/>
          </Route>
          <Route path="/event" element={ <Suspense><Event /></Suspense> }>
            <Route path="one" element={  <Suspense><One /></Suspense> }/>
            <Route path="two" element={ <Suspense><Two /></Suspense> }/>
          </Route>
          <Route path="*" element={ <div>404 Error</div> }/>
          <Route path="/cart" element={<Cart />} />
        </Routes>
    
    </>
  )
}

function About() {
  return(
    <>
      <div>
        <h4>회사정보</h4>
        <Outlet></Outlet>
      </div>
    </>
  )
}

function Product({detail}){
  return(
    <>
      {detail.map((item, index) => {
      return(
        <Link to={`/detail/${item.id}`} key={index}><Col sm>
          <img src={'https://codingapple1.github.io/shop/shoes' + (index + 1) + '.jpg'} width="80%" alt={item.title} />
          <h4>{item.title}</h4>
          <p>{item.content}</p>
          <span>{item.price}</span>
          <br></br>
        </Col>
        </Link>
      )
    })}
    </>  
  )
}

export default App;
