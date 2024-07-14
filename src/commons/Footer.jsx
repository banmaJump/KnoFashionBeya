//src/commons/Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faYoutube, faThreads, faTiktok } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <h2>公式アカウント</h2>
        <div className="icons">
          <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
          <a href="#"><FontAwesomeIcon icon={faThreads} /></a>
          <a href="#"><FontAwesomeIcon icon={faTiktok} /></a>
        </div>
      </div>
      <div className="footer-left col-md-4 col-sm-6">
        <p className="about">
          <span> About K</span> <p>ようこそ、Kのファッション部屋へ！
          このチャンネルでは、僕の大好きなファッションやビジネスに関する情報を発信していきます。僕自身、ファッションが今の自分を作り上げたと言っても過言ではありません。高校卒業後からファッションにのめり込み、年間500万円以上を洋服に費やしてきました。正直、ちょっとアホですよね（笑）。
          これまでに、世界最高峰のファッション誌に掲載されたり、有名ブランドの公式インスタグラムに取り上げられたりと、様々な経験をしてきました。また、スタイリストのアシスタントや、映画やCMのスタイリングを担当したこともあります。現在は、ファッション系の企業で働きながら、皆さんに役立つ情報をお届けしています。
          このサイトでは、ファッションの楽しさやトレンド、ビジネスのコツなど、様々なテーマでお話ししていきます。僕の情熱が皆さんに伝われば嬉しいです。
          ぜひ、公式アカウントもフォローして最新情報をチェックしてください！僕と一緒に、ファッションやビジネスの世界を楽しんでいきましょう。よろしくお願いします！</p>
        </p>
      </div>
      <div className="footer-center col-md-4 col-sm-6">
        <div className="jigzag">
          <p>お問い合わせ</p>
        </div>
        <div className="jigzag">
          <p>Q&A</p>
        </div>
      </div>
      <div className="footer-right col-md-4 col-sm-6">
        <h2>Kのファッション<span>部屋</span></h2>
        <p className="menu">
          <a href="#"> Home</a> 
          <a href="#"> About</a> 
          <a href="#"> Goods</a> 
          <a href="#"> Radio</a> 
          <a href="#"> Vlogs</a>
          <a href="#"> News</a>
        </p>
        <p className="name"><a href="/beneeeeeeeeefit">Company Name &copy; 2024</a></p>
      </div>
    </footer>
  );
};

export default Footer;
