import React from 'react';
import pic from'../../../assets/images/catmode_3.jpg';

const GoodMain = () => {
  return (
    <div className="goodDetailMain">
      <div className="goodDetailText">
        <h2>限定グッズ</h2>
        <p>Get stylish with Catmode3</p>
        <a className='button' src="#">Shop now</a>
      </div>
      <div className='goodDetailImage'>
        <img src={pic} alt='グッズの写真'></img>
      </div>
    </div>
  );
};

export default GoodMain;