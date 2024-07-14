import React from 'react';

const ListItem = ({ title, description, date, author, imageUrl, linkUrl, articleLink }) => {
  return (
    <div className="list-item">
      <a href={articleLink} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt={title}></img>
      </a>
      <div className="list-item-content">
        <p className="list-item-contentnop">{description}</p>
        <div className='list-item-content-div'>
          <p>{new Date(date).toDateString()}</p>
          <p>By {author}</p>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
