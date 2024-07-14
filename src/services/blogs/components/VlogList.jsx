import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListLayout from './ListLayout.jsx';
import Pagination from '../../../commons/Pagination.jsx';

const VlogList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/vlogs', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        setArticles(response.data.items);
        setTotalItems(response.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching vlog list:', error);
        setError('Failed to fetch vlog list');
        setLoading(false);
      }
    };

    fetchArticles();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='brand_detail_brand_intro'>
      <ListLayout
        title="すべての記事"
        genre="Vlog"
        items={articles}
        articleLink={article => `/vlog/${article.id}`}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default VlogList;
