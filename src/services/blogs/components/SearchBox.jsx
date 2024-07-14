import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SearchBox = ({ closeMenu }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      try {
        const response = await axios.get(`/api/search-suggestions?query=${query}`);
        setSuggestions(response.data.slice(0, 10)); // 最大10件の結果を表示
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    closeMenu(); // メニューを閉じる
    if (['goods', 'グッズ', '商品'].some(term => searchQuery.toLowerCase().includes(term))) {
      navigate(`/goods`);
    } else {
      navigate(`/search-results?query=${searchQuery}`);
    }
    setSearchQuery(''); // 検索フォームの中身をクリア
  };

  const handleSuggestionClick = () => {
    closeMenu(); // メニューを閉じる
    setSearchQuery(''); // 検索フォームの中身をクリア
  };

  const generateLink = (suggestion) => {
    const { genre, link } = suggestion;
    if (genre === 'グッズ' && link) {
      return link; // 特定のグッズアイテムのリンクに遷移
    } else if (['goods', 'グッズ', '商品'].some(term => genre.toLowerCase().includes(term))) {
      return `/goods`; // グッズ一覧ページに遷移
    } else {
      return suggestion.link; // デフォルトのリンク
    }
  };

  return (
    <div className="search-box">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="検索中・・・"
        />
        <button type="submit">Search</button>
      </form>
      {suggestions.length > 0 && (
        <ul className="search-suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={handleSuggestionClick}>
              <Link to={generateLink(suggestion)}>
                {suggestion.name} - {suggestion.genre}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
