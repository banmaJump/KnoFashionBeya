import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'slick-carousel';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [carouselPaused, setCarouselPaused] = useState(false);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get('/api/news', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
        console.log('API response:', response.data);
        const itemsWithDefaultImage = response.data.items.map(item => ({
          ...item,
          image_url: item.image_url || 'https://csshtml.work/wp-content/uploads/cat.jpg'
        }));
        setArticles(itemsWithDefaultImage);
      } catch (error) {
        console.error('Error fetching details:', error);
        setError('エラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [currentPage]);

  useEffect(() => {  //動きすぎるから止めてるだけ
    // if (!carouselPaused) {
    //   $('.news-carousel').slick({
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     adaptiveHeight: true,
    //   });
    // }
  }, [articles, carouselPaused]);

  const handlePauseCarousel = () => {
    setCarouselPaused(true);
    $('.news-carousel').slick('slickPause');
    setTimeout(() => {
      setCarouselPaused(false);
      $('.news-carousel').slick('slickPlay');
    }, 5000); // Pause for 5 seconds
  };

  const handleShowContent = (e) => {
    e.stopPropagation();
    e.currentTarget.classList.add('show-content');
    handlePauseCarousel();
  };

  const handleHideContent = (e) => {
    e.stopPropagation();
    document.querySelectorAll('.show-content').forEach(el => el.classList.remove('show-content'));
  };

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="news-container" onClick={handleHideContent}>
      <h1 className='everyday-title'>News</h1>
      <button className="carousel-button left" onClick={() => $('.news-carousel').slick('slickPrev')}></button>
      <button className="carousel-button right" onClick={() => $('.news-carousel').slick('slickNext')}></button>
      <div className="news-carousel">
        {articles.map(article => (
          <div key={article.id} className="news-slide" onClick={handleShowContent}>
            <img src={article.image_url} alt={article.title} />
            <div className="news-content">
              <h3>{article.title}</h3>
              <p>{article.title_content}</p>
              <p>{article.genre}</p>
              <a href={article.link} className="news-link">記事を読む</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
