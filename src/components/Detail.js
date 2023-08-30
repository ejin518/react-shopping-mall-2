import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import './Detail.css';
import Nav from 'react-bootstrap/Nav';
import { getInfo } from '../store';
//import styled from 'styled-components';
// let YellowBtn = styled.button`
//   background : ${ props => props.bg };
//   color: ${ props => props.bg === 'blue' ? 'white' : 'black'};
//   padding : 10px;
// `
// let NewBtn = styled(YellowBtn)`
//   border:none;
//   color:red;
// `
// let Box = styled.div `
//   background: grey;  
//   padding: 20px;
// `
function Detail({shoes}) {
    const [value, setValue] = useState('');
    const [showDiv, setShowDiv] = useState(false);
    const [clickTab, setClickTab] = useState(1);
    const [fade, setFade] = useState('');
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    let [count, setCount] = useState(0);
    let {id} = useParams();
    id = Number(id);
    let dispatch = useDispatch();

    const foundShoe = shoes.find((info) => info.id === id);
    const onChangeInput = (event) => {
      setValue(event.target.value);
    }
    useEffect(() => {
      const a = setTimeout(() => {
        setFade('end');
      }, 100);
      const disappear = setTimeout(()=>{
        setShowDiv(true);
      }, 2000);
      // console.log(2);
      if(isNaN(value)) {
        alert("숫자를 입력해주세요!");
      }
      return () => {
        // console.log(1);
        clearTimeout(disappear);
        clearTimeout(a);
        setFade('');
      } 
    }, [value]);
    useEffect(()=>{
      let getInfo = localStorage.getItem('watched');
      getInfo = JSON.parse(getInfo) || [];
      // // getInfo = new Set(getInfo) Set 자료형 중복을 없애줌. 
      // // getInfo = Array.from(getInfo) getInfo를 다시 array형태로 바꿈
      // // array => set => array로 다시 바꿔주는 형태
      if(getInfo){
        getInfo.push(foundShoe)
        localStorage.setItem('watched', JSON.stringify(getInfo));
        setRecentlyViewed(getInfo);
      }
      
      
      // if(!getInfo.includes(foundShoe.id)){
      //   getInfo.push(foundShoe.id);
      //   localStorage.setItem('watched', JSON.stringify(getInfo));
      // }
  //    // 이전에 저장된 watchedItem을 가져옴
  // const storedWatched = JSON.parse(localStorage.getItem('watched')) || [];
  // dispatch(recentlyWatched(storedWatched));
  // if (foundShoe && !storedWatched.includes(foundShoe.id)) {
  //   // 새로운 foundShoe.id를 추가하여 새 배열을 생성
  //   const newWatchedItem = [...storedWatched, foundShoe.id]; 
  //   // 새 배열을 로컬스토리지에 저장
  //   localStorage.setItem('watched', JSON.stringify(newWatchedItem));
  // }
}, [shoes]);
    return(
      <>
        <div className={`container start ${fade}`}>
          <div className="detail-wrap">
            {!showDiv ? <div className="alert alert-warning">2초이내 구매시 할인</div> : null}
            <button onClick={()=>{setCount((current) => current + 1)}}>{count}</button>
            {/* <Box>
              <YellowBtn bg="blue">Button</YellowBtn>
              <YellowBtn bg="yellow">Button</YellowBtn>
              <NewBtn bg="yellow">Button</NewBtn>
            </Box> */}
            {id >= 0 && id < shoes.length ?
            <div className="row">
            <div className="col-md-6">
                <img src={"https://codingapple1.github.io/shop/shoes" + (foundShoe.id + 1) + ".jpg"} width="100%" />
            </div>
            <div className="col-md-6">
              <input onChange={onChangeInput} />
                <h4 className="pt-5">{foundShoe.title}</h4>
                <p>{foundShoe.content}</p>
                <p>{foundShoe.price}</p>
                <button className="btn btn-danger" onClick={()=>{
                  dispatch(getInfo(foundShoe))
                }}>주문하기</button> 
            </div>
          </div>
          : <div>결과가 없습니다.</div> }
          </div>
          <div className="tab-wrap">
          <Nav variant="tabs" defaultActiveKey="tab1">
            <Nav.Item onClick={()=>{setClickTab(1)}}>
              <Nav.Link eventKey="tab1">tab1</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>{setClickTab(2)}}>
              <Nav.Link eventKey="tab2">tab2</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={()=>{setClickTab(3)}}>
              <Nav.Link eventKey="tab3">
                tab3
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab clickTab={clickTab} shoes={shoes}/>
          </div>
          <div className="recent-items">
            <h3>Recently Viewed</h3>
            <ul className="recent-item">
              {recentlyViewed.map(item => (
                <Link to={`/detail/${item.id}`} key={item.id}>
                  <li>
                    <img src={`https://codingapple1.github.io/shop/shoes${item.id + 1}.jpg`} alt={item.title} />
                    <p>{item.title}</p>
                    <span>{item.price}</span>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div> 
        
      </>
    )
  }
function Tab({clickTab, shoes}){
  const [fade, setFade] = useState('')
  useEffect(()=>{
    let a = setTimeout(()=>{
      setFade('end');
    },100)
    return () => {
      clearTimeout(a);
      setFade('');
    }
  },[clickTab])
  if(clickTab === 1 ) {
    return (<div><div className={'start ' + fade}>dd tab1<h3>{shoes[0].title}</h3></div></div>)
  }else if(clickTab === 2) {
    return (<div><div className={`start ${fade}`}>sdfsdtab2</div></div>)
  }else if(clickTab === 3) {
    return (<div><div className={'start ' + fade}>tabdfsf</div></div>)
  }
}
  export default Detail