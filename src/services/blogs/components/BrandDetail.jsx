import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListLayout from './ListLayout.jsx';
import Pagination from '../../../commons/Pagination.jsx';

const BrandDetail = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState({});
  const [articles, setArticles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortOrder, setSortOrder] = useState('newest');
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        const [brandResponse, articlesResponse, imagesResponse] = await Promise.all([
          axios.get(`/api/brands/${id}`),
          axios.get(`/api/brands/${id}/articles`, {
            params: { page: currentPage, limit: itemsPerPage, sort: sortOrder },
          }),
          axios.get(`/api/brands/${id}/images`),
        ]);

        setBrand(brandResponse.data);
        setArticles(articlesResponse.data.items);
        setTotalItems(articlesResponse.data.totalCount);
        setImages(imagesResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching brand details:', error);
        setError('Failed to fetch brand details');
        setLoading(false);
      }
    };

    fetchBrandDetails();
  }, [id, currentPage, sortOrder]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='brand_detail_brand_intro'>
      <h1>現在開発中</h1>
      <h1>{brand.name}</h1>
      {images.length > 0 && (
        <img src={images[0].url} alt={`${brand.name} image`} className="brand-image"></img>
      )}
      <p>{brand.description}</p>
      <ListLayout
        title={`全ての記事`}
        genre={brand.name}
        items={articles}
        articleLink={(article) => `/brands/${id}/articles/${article.id}`} // ブランドに関連する特定の記事ページへのリンク
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
      />
      <Pagination
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BrandDetail;
