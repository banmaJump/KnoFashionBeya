import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const SubHeader = () => {
  const memoizedLinks = useMemo(() => (
    <ul className="sub-nav-links">
     <li><Link to="/">Home</Link></li>
      <li><Link to="/radios">ラジオ</Link></li>
      <li><Link to="/brands">記事</Link></li>
      <li><Link to="/vlog">Vlog</Link></li>
      <li><Link to="/goods">グッズ</Link></li>
    </ul>
  ), []);

  return (
    <div className="sub-header">
      {memoizedLinks}
    </div>
  );
};

export default SubHeader;
