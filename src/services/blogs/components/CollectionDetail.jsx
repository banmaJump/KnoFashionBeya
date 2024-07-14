import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListLayout from './ListLayout.jsx';
import Pagination from '../../../commons/Pagination.jsx';

const CollectionDetail = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState({});
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      try {
        const collectionResponse = await axios.get(`/api/collections/${id}`);
        setCollection(collectionResponse.data);

        const articlesResponse = await axios.get(`/api/collections/${id}/articles`, {
          params: { page: currentPage, limit: itemsPerPage },
        });
        setArticles(articlesResponse.data.items);
        setTotalItems(articlesResponse.data.totalCount);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching collection details:', error);
        setError('Failed to fetch collection details');
        setLoading(false);
      }
    };

    fetchCollectionDetails();
  }, [id, currentPage]);

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
    <div className="brand_detail_brand_intro">
      <h1>現在開発中</h1>
      <ListLayout
          title={'コレクション'}
          genre={collection.name}
          items={articles}
          articleLink={(article) => `/articles/${article.id}`}
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

export default CollectionDetail;
