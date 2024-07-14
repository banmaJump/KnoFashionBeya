import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoodList = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await axios.get('/api/goods', {
          params: { page: currentPage, limit: 12 }
        });
        setGoods(prevGoods => [...prevGoods, ...response.data]);
        if (response.data.length < 12) {
          setHasMore(false);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching goods:', error);
        setError('Failed to fetch goods');
        setLoading(false);
      }
    };

    fetchGoods();
  }, [currentPage]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
      if (hasMore && !loading) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  if (loading && currentPage === 1) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const latestMonth = goods.length > 0 ? new Date(goods[0].created_at).getMonth() : null;
  const latestYear = goods.length > 0 ? new Date(goods[0].created_at).getFullYear() : null;

  return (
    <div className='ipod-container'>
      <div className="ipod-header">
        <div className="everyday-title">
          <h1>Goods</h1>
        </div>
      </div>
      <div className="ipod-items">
        {goods.map(good => (
          // いつかGoodItem作る。その時はこれに変える。今は直接GoodItemに飛ぶよう作ってる。
          // <a key={good.id} href={`/goods/${good.id}`} className="ipod-item-link"> 
          <a key={good.id} href={good.item_link} className="ipod-item-link">
            <div className="ipod-item">
              <div className='goodImagin'>
                <img src={good.image_url} alt={good.message} className="ipod-item-image" />
              </div>
              <div className="ipod-item-content">
                <h3>{good.title}</h3>
                {new Date(good.created_at).getMonth() === latestMonth && new Date(good.created_at).getFullYear() === latestYear && (
                  <span className="ipod-new-tag">New</span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
      {loading && <p>Loading more...</p>}
    </div>
  );
};

export default GoodList;
