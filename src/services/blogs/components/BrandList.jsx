import React, { useEffect, useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import ListLayout from './ListLayout.jsx';
import Pagination from '../../../commons/Pagination.jsx';

const BrandList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchBrandArticles = async () => {
      try {
        const response = await axios.get('/api/brands', {
          params: {
            page: currentPage,
            limit: itemsPerPage
          }
        });
        setArticles(response.data.items);
        setTotalItems(response.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching brand articles:', error);
        setError('Failed to fetch brand articles');
        setLoading(false);
      }
    };

    fetchBrandArticles();
  }, [currentPage]);

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  const paginatedArticles = useMemo(() => articles, [articles]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='brand_detail_brand_intro'>
      <ListLayout
        title="全ての記事"
        genre="ブランド"
        items={paginatedArticles}
        articleLink={(article) => `/brand/${article.id}`}
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

export default BrandList;
