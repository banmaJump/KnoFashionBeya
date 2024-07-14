import React from 'react';
import itemImage1 from '../../../assets/images/KnoFashionArticle.png';
import itemImage2 from '../../../assets/images/KnoFashionRadio.png';
import itemImage3 from '../../../assets/images/KnoFashionVlog.png';
import itemImage4 from '../../../assets/images/KnoFashionGoods.png';

const HomeItem = () => {
  const items = [
    {
      imgSrc: itemImage1,
      title: '一般記事',
      description: '最新のトレンドから深掘りした分析まで、幅広いトピックを取り扱った記事をお届けします。興味を引く情報が満載です！',
      link: '/brands',
      back:'#7793e4'
    },
    {
      imgSrc: itemImage2,
      title: 'ラジオ',
      description: 'お耳に心地よい音楽や興味深いトークをお届けするラジオセクションです。通勤中やリラックスタイムのお供にどうぞ。',
      link: '/radio',
      back:'#d72300'
    },
    {
      imgSrc: itemImage3,
      title: 'Vlog',
      description: '日常の一コマや特別なイベントを映像でお届けします。私たちの生活や冒険を一緒に楽しみましょう！',
      link: '/vlog',
      back:'#ffa900'
    },
    {
      imgSrc: itemImage4,
      title: 'グッズ',
      description: 'オリジナルのグッズが勢ぞろい！ここでしか手に入らないアイテムをチェックして、お気に入りを見つけてください。',
      link: '/goods',
      back:'#178739'
    },
  ];

  return (
    <ul className="homeitem-details">
      {items.map((item, index) => (
        <li className="homeitem-type2" key={index}>
          <figure className="homeitem-image">
            <img src={item.imgSrc} alt={item.title} width="500" height="400"></img>
          </figure>
          <dl className="homeitem-text" style={{ backgroundColor: item.back }}>
            <dt>{item.title}</dt>
            <dd>{item.description}</dd>
            <dd className="homeitem-price">
              <a href={item.link}>今すぐチェック！</a>
            </dd>
          </dl>
        </li>
      ))}
    </ul>
  );
};

export default HomeItem;
