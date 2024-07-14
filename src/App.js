import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './commons/Header.jsx';
import SubHeader from './commons/SubHeader.jsx';
import Footer from './commons/Footer.jsx';
import News from './commons/News.jsx';

const ArticleView = lazy(() => import('./services/blogs/components/ArticleView.jsx'));
const BrandList = lazy(() => import('./services/blogs/components/BrandList.jsx'));
const BrandDetail = lazy(() => import('./services/blogs/components/BrandDetail.jsx'));
const CollectionDetail = lazy(() => import('./services/blogs/components/CollectionDetail.jsx'));
const Detail = lazy(() => import('./services/blogs/components/Detail.jsx'));
const GoodList = lazy(() => import('./services/blogs/components/GoodList.jsx'));
const Home = lazy(() => import('./services/blogs/components/Home.jsx'));
const RadioList = lazy(() => import('./services/blogs/components/RadioList.jsx'));
const VlogList = lazy(() => import('./services/blogs/components/VlogList.jsx'));
const Banma = lazy(() => import('./services/blogs/components/Banma.jsx'));

const App = () => {
  const location = useLocation();
  const isBanmaRoute = location.pathname === '/banma';
  return (
    <>
      {!isBanmaRoute && <Header />}
      {!isBanmaRoute && <SubHeader />}
      <div className="container">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Detail />} />
            <Route path="/brands" element={<BrandList />} />
            <Route path="/goods" element={<GoodList />} />
            <Route path="/radios" element={<RadioList />} />
            <Route path="/vlogs" element={<VlogList />} />
            <Route path="/article/:articleId" element={<ArticleView />} />
            {/* <Route path="/brands/:id" element={<BrandDetail />} />
            <Route path="/collections/:id" element={<CollectionDetail />} /> */}
            <Route path="/banma" element={<Banma />} />
            <Route path="/beneeeeeeeeefit" element={() => { window.location.href = '/beneeeeeeeeefit'; return null; }} />
          </Routes>
        </Suspense>
      </div>
      {!isBanmaRoute && <News />}
      {!isBanmaRoute && <Footer />}
    </>
  );
};

export default App;
