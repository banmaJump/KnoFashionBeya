import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ListLayout from './ListLayout.jsx';
import Pagination from '../../../commons/Pagination.jsx';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RadioList = () => {
  const query = useQuery().get('query') || '';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('/api/radios', {
          params: {
            query,
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        console.log('Fetched articles:', response.data);
        setArticles(response.data.items);
        setTotalItems(response.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching radio list:', error);
        setError('Failed to fetch radio list');
        setLoading(false);
      }
    };

    fetchArticles();
  }, [query, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
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
        title="すべての記事"
        genre="ラジオ"
        items={articles}
        articleLink={article => `/radio/${article.id}`}
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

export default RadioList;
