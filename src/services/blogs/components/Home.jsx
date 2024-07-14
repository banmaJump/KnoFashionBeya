// export default Home;
import React from 'react';
import HomeItem from './HomeItem';
import HomeImage from './HomeImage';
import GoodMain from './GoodMain';

const Home = () => {
  return (
    <div>
      <HomeImage />
      <HomeItem />
      <GoodMain />
    </div>
  );
};

export default Home;

