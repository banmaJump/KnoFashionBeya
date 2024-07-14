const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const connection = require('./src/services/blogs/models/blog_server.js'); // MySQL接続
const blogRouter = require('./src/services/blogs/controllers/controller.js'); // ルーター

const app = express();

// CORS設定
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

// ミドルウェア設定
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静的ファイル提供
app.use('/static', express.static(path.join(__dirname, 'public/static')));
app.use('/slick', express.static(path.join(__dirname, 'public/slick')));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
app.use(express.static(path.join(__dirname, 'public')));

// EJS設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/services/blogs/views'));

// APIルーター設定
app.use('/api', blogRouter);

// EJSルート定義
app.get('/beneeeeeeeeefit', (req, res) => {
  res.render('beneeeeeeeeefit');
});

// クライアントサイドのルートを処理
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// サーバーの起動
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// const express = require('express');
// const path = require('path');
// const cors = require('cors');
// const fs = require('fs');
// const connection = require('./src/services/blogs/models/blog_server.js'); // MySQL接続
// const blogRouter = require('./src/services/blogs/controllers/controller.js'); // ルーター

// const app = express();

// // CORS設定
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// };

// app.use(cors(corsOptions));

// // ミドルウェア設定
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // 静的ファイル提供
// app.use('/static', express.static(path.join(__dirname, 'public/static')));
// app.use('/slick', express.static(path.join(__dirname, 'public/slick')));
// app.use(express.static(path.join(__dirname, 'public')));

// // EJS設定
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'src/services/blogs/views'));

// // APIルーター設定
// app.use('/api', blogRouter);

// // クライアントサイドのルートを処理
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// app.get('/blogs', (req, res) => {
//   const sql = `
//     SELECT * FROM articles
//     ORDER BY created_at DESC
//     LIMIT 5
//   `;

//   connection.query(sql, (error, results) => {
//     if (error) {
//       console.error('Error fetching news:', error);
//       res.status(500).send('Error fetching news');
//       return;
//     }

//     res.render('blog', { articles: results });
//   });
// });

// // EJSルート定義
// app.get('/beneeeeeeeeefit', (req, res) => {
//   res.render('beneeeeeeeeefit');
// });

// // サーバーの起動
// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

//一番最後に消す。絶対いらないから。
// // 検索エンドポイントの設定
// app.get('/search', (req, res) => {
//   const { query, page = 1, limit = 12 } = req.query;
//   const searchTerms = query.split(' ');
  
//   let sql = `
//     SELECT a.id, a.title, a.title_content, a.created_at, a.genre, b.name as brand_name, c.name as collection_name
//     FROM articles a
//     LEFT JOIN brands b ON a.brand_id = b.id
//     LEFT JOIN collections c ON a.collection_id = c.id
//     WHERE 1 = 1`;

//   const params = [];

//   searchTerms.forEach(term => {
//     sql += ` AND (a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ? OR c.name LIKE ?)`;
//     params.push(`%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`);
//   });

//   sql += ` LIMIT ? OFFSET ?`;
//   params.push(parseInt(limit), (parseInt(page) - 1) * parseInt(limit));

//   connection.query(sql, params, (error, results) => {
//     if (error) {
//       res.status(500).send('Error fetching search results');
//       return;
//     }

//     if (results.length === 1) {
//       // 検索結果が1件の場合、article_view.ejsをレンダリング
//       const article = results[0];
//       const templateFileName = `${String(article.id).padStart(4, '0')}.ejs`;
//       const templatePath = path.join(__dirname, 'src/services/blogs/data', templateFileName);
//       res.render(templatePath, { article });
//     } else {
//       // 検索結果が複数の場合、Reactコンポーネントにデータを送る
//       res.json({ items: results, totalCount: results.length });
//     }
//   });
// });

////////////////////////////////////////////////////////////////////////

// // ラジオ記事リストのルート　=> RadioList.jsx
// app.get('/radios', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = 18;  // ページあたりのアイテム数を18に設定
//     const offset = (page - 1) * limit;
    
//     // APIエンドポイントからデータを取得
//     const response = await axios.get(`http://localhost:${port}/api/radios`, {
//       params: {
//         page,
//         limit,
//       },
//     });

//     const { items, totalCount } = response.data;

//     res.json({
//       items,
//       currentPage: page,
//       itemsPerPage: limit,
//       totalItems: totalCount,
//     });
//   } catch (error) {
//     res.status(500).send('Error fetching radio list');
//   }
// });

// // Goods リストのルート
// app.get('/goods', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = 12;
//     const offset = (page - 1) * limit;

//     // APIエンドポイントからデータを取得
//     const response = await axios.get(`http://localhost:${port}/api/goods`, {
//       params: {
//         page,
//         limit,
//       },
//     });

//     const items = response.data;

//     res.render({
//       items,
//       loading: false,
//     });
//   } catch (error) {
//     console.error('Error fetching goods list:', error);
//     res.status(500).send('Error fetching goods list');
//   }
// });

// // 特定のブランドの詳細ページをレンダリングするルート => BrandDetail.jsx
// app.get('/brands/:id', async (req, res) => {
//   const brandId = req.params.id;
//   try {
//     const brandResponse = await axios.get(`http://localhost:${port}/api/brands/${brandId}`);
//     const brand = brandResponse.data;

//     // 画像データを取得
//     const imagesResponse = await axios.get(`http://localhost:${port}/api/brands/${brandId}/images`);
//     const images = imagesResponse.data;

//     res.render({
//       brand,
//       articles: [],
//       images,  // 画像データを追加
//       currentPage: 1,
//       itemsPerPage: 10,
//       totalItems: 0
//     });
//   } catch (error) {
//     console.error('Error fetching brand details:', error);
//     res.status(500).send('Error fetching brand details');
//   }
// });

// // 特定のブランドに関連するすべての記事ページをレンダリングするルート => BrandDetail.jsx
// app.get('/brands/:id/articles', async (req, res) => {
//   const brandId = req.params.id;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   try {
//     const brandResponse = await axios.get(`http://localhost:${port}/api/brands/${brandId}`);
//     const articlesResponse = await axios.get(`http://localhost:${port}/api/brands/${brandId}/articles?page=${page}&limit=${limit}`);
    
//     // 画像データを取得
//     const imagesResponse = await axios.get(`http://localhost:${port}/api/brands/${brandId}/images`);
//     const images = imagesResponse.data;

//     const brand = brandResponse.data;
//     const articles = articlesResponse.data.items;
//     const totalItems = articlesResponse.data.totalCount;

//     res.render({
//       brand,
//       articles,
//       images,  // 画像データを追加
//       currentPage: page,
//       itemsPerPage: limit,
//       totalItems
//     });
//   } catch (error) {
//     console.error('Error fetching brand articles:', error);
//     res.status(500).send('Error fetching brand articles');
//   }
// });

// //特定のコレクションの詳細ページをレンダリングするルート => CollectionDetail.jsx
// app.get('/collections/:id', async (req, res) => {
//   const collectionId = req.params.id;
//   try {
//     const collectionResponse = await axios.get(`http://localhost:${port}/api/collections/${collectionId}`);
//     const collection = collectionResponse.data;

//     // コレクションに関連する記事を取得
//     const articlesResponse = await axios.get(`http://localhost:${port}/api/collections/${collectionId}/articles`, {
//       params: { page: 1, limit: 10 }
//     });
//     const articles = articlesResponse.data.items;
//     const totalItems = articlesResponse.data.totalCount;

//     res.render({
//       collection,
//       articles,
//       currentPage: 1,
//       itemsPerPage: 10,
//       totalItems
//     });
//   } catch (error) {
//     console.error('Error fetching collection details:', error);
//     res.status(500).send('Error fetching collection details');
//   }
// });

// // 特定のコレクションに関連するすべての記事ページをレンダリングするルート => CollectionDetail.jsx
// app.get('/collections/:id/articles', async (req, res) => {
//   const collectionId = req.params.id;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 10;
//   try {
//     const collectionResponse = await axios.get(`http://localhost:${port}/api/collections/${collectionId}`);
//     const articlesResponse = await axios.get(`http://localhost:${port}/api/collections/${collectionId}/articles`, {
//       params: { page, limit }
//     });
//     const articles = articlesResponse.data.items;
//     const collection = collectionResponse.data;
//     const totalItems = articlesResponse.data.totalCount;

//     res.render({
//       collection,
//       articles,
//       currentPage: page,
//       itemsPerPage: limit,
//       totalItems
//     });
//   } catch (error) {
//     res.status(500).send('Error fetching collection articles');
//   }
// });