import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from './ListItem.jsx';

const ListLayout = ({ title, genre, items, articleLink, sortOrder, handleSortChange }) => {
  console.log('ListLayout items:', items); // デバッグログ追加
  return (
    <div className="ListLayoutBoader">
      <h1 className='everyday-title'>{title}</h1>
      <div className='flexs_system'>
        <h2>カテゴリ「{genre}」</h2>
        <div className="sort-options">
          <label>
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </label>
        </div>
      </div>
      <div className="sub-header-2">
        <ul className="sub-nav-links-2">
          <Link to="/"><li>Home</li></Link>
          <Link to="/radios"><li>ラジオ</li></Link>
          <Link to="/brands"><li>記事</li></Link>
          <Link to="/vlogs"><li>Vlog</li></Link>
          <Link to="/goods"><li>グッズ</li></Link>
        </ul>
      </div>
      <div className="list-container">
        {items.map(item => (
          <ListItem
            key={item.id}
            title={item.title}
            description={item.title_content}
            date={item.created_at}
            author={item.brand_name}
            imageUrl={item.image_url}
            linkUrl={item.link_url}
            articleLink={articleLink(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListLayout;
