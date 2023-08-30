import React, { useState } from 'react';
import './Blog.css';

function Blog() {
  const [title, setTitle] = useState(['남자코트추천', '강남 우동 맛집', '강남고기맛집']);
  const [number, setNumber] = useState([0, 0, 0]);
  const [modal, setModal] = useState(false);
  const [order, setOrder] = useState(0);
  const [value, setValue] = useState('');

  const onClickLike = (index) => {
      var newNumArray = [...number];
      newNumArray[index] = newNumArray[index] + 1;
      setNumber(newNumArray);
      
  }
  const onClickBtn = () => {
    //setTitle(['여자코트추천', ...title.slice(1)]);

    var newArray = [...title]; //...을 붙여서 deep copy 값을 공유하지 않고 서로 독리적인 값을 가지는 복사를 해야함. var newArray = title;을 하게 되면 title값이 newArray에 복사가 되는 것이 아니라 값을 공유하게 됨. newArray의 값이 바뀌면 title의 값도 똑같이 바뀜.
    newArray[0] = '여자코트추천';
    setTitle(newArray);
    
  }
  const onClickTitle = (index) => {
    setModal(true);
    setOrder(index);
  }
  const onClickUpload = () => {
    var newArray = [value, ...title];
    var newNumber = [0, ...number];
    setTitle(newArray);
    setNumber(newNumber);
    setValue('');
  }
  const onClickDelete = (index) => {
    var newArray = title.filter((num => num !== title[index]));
    setTitle(newArray);
  }
  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 Blog</div>
      </div>
      <button onClick={onClickBtn}>Change</button>
        <div className='list'>
          {title.map((item, index) => {
            return (
              <>
                <h3 key={index}><span onClick={() => onClickTitle(index)}>{item}</span><span onClick={() => onClickLike(index)}>👍</span>{number[index]}<button onClick={() => onClickDelete(index)}>Delete</button></h3>
                <p>2월 17일 발행</p>
                <hr/>
              </> 
            )
          })}
        </div>
        <div className='inputTitle'>
          <input type="text" value={value} onChange={(e) => {setValue(e.target.value);}}></input>
          <button onClick={onClickUpload}>Upload</button>
        </div>
        {modal === true ? <Modal title={title} click={onClickBtn} order={order}/> : null}
    </div>
  );
}

function Modal({title, click, order}) {
  return(
      <div className='modal'>
        <h2>{title[order]}</h2>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={click}>Change</button>
      </div>
  )
}

export default Blog;
