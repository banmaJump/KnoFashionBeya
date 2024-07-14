import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ListLayout from './ListLayout.jsx';
import Pagination from '../../../commons/Pagination.jsx';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Detail = () => {
  const query = useQuery().get('query') || '';
  const type = useQuery().get('type') || 'all';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    console.log(`Query: ${query}, Type: ${type}`); // デバッグ情報

    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/details', {
          params: {
            query,
            type,
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        if (response.data.redirect) {
          window.location.href = response.data.redirect;
          return;
        }

        setArticles(response.data.items || []);
        setTotalItems(response.data.totalCount || 0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching details:', error);
        setError('Failed to fetch details');
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, type, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading && currentPage === 1) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (articles.length === 0) {
    return (
      <div className='brand_detail_brand_intro'>
        <h2>検索対象はありませんでした。</h2>
      </div>
    );
  }

  return (
    <div className='brand_detail_brand_intro'>
      <ListLayout
        title="検索結果"
        genre="ALLジャンル"
        items={articles}
        articleLink={article => `/article/${article.id}`}
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

export default Detail;
