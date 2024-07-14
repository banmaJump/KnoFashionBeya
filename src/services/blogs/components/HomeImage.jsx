import React from 'react';
import backgroundImage from '../../../assets/images/K_main.png';

const HomeImage = () => {
  return (
    <div className='unique-homeimage-margin'>
    <div className="unique-homeimage-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="unique-memo">
        <h1>Welcome to Our Page</h1>
        <p>This blog is dedicated to sharing insights, trends, and updates in the fashion industry. Stay tuned for the latest collections, brand stories, and much more!</p>
      </div>
    </div>
    </div>
  );
};

export default HomeImage;
