//src/services/blogs/controllers/controller.js
const express = require('express');
const router = express.Router();
const connection = require('../models/blog_server.js'); 

// 特定のブランドの詳細を取得するエンドポイント
router.get('/brands/:id', (req, res) => {
  const brandId = req.params.id;
  const sql = 'SELECT * FROM brands WHERE id = ?';

  console.log(`Fetching brand with id ${brandId}`); // ログ追加

  connection.query(sql, [brandId], (error, results) => {
    if (error) {
      console.error(`Error fetching brand with id ${brandId}:`, error);
      res.status(500).send(`Error fetching brand with id ${brandId}`);
      return;
    }
    if (results.length === 0) {
      console.warn(`Brand with id ${brandId} not found`); // 警告ログ追加
      res.status(404).send(`Brand with id ${brandId} not found`);
      return;
    }
    console.log(`Brand with id ${brandId} found:`, results[0]); // ログ追加
    res.json(results[0]);
  });
});

// 特定のブランドに関連するすべての記事を取得するエンドポイント
router.get('/brands/:id/articles', (req, res) => {
  const brandId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url
    FROM articles a
    LEFT JOIN brands b ON a.brand_id = b.id
    WHERE a.brand_id = ?
    ORDER BY a.created_at DESC
    LIMIT ? OFFSET ?
  `;

  console.log(`Fetching articles for brand with id ${brandId}`); // ログ追加

  connection.query(sql, [brandId, limit, offset], (error, results) => {
    if (error) {
      console.error(`Error fetching articles for brand with id ${brandId}:`, error);
      res.status(500).send(`Error fetching articles for brand with id ${brandId}`);
      return;
    }
    connection.query('SELECT COUNT(*) AS totalCount FROM articles WHERE brand_id = ?', [brandId], (countError, countResults) => {
      if (countError) {
        console.error('Error fetching articles count:', countError);
        res.status(500).send('Error fetching articles count');
        return;
      }
      console.log(`Articles for brand with id ${brandId} found:`, results); // ログ追加
      res.json({ items: results, totalCount: countResults[0].totalCount });
    });
  });
});

// 画像データを取得するエンドポイント => BlandImagesのIntroで使う
router.get('/brands/:id/images', (req, res) => {
  const brandId = req.params.id;
  const sql = 'SELECT url FROM images WHERE brand_id = ?';

  connection.query(sql, [brandId], (error, results) => {
    if (error) {
      console.error(`Error fetching images for brand with id ${brandId}:`, error);
      res.status(500).send(`Error fetching images for brand with id ${brandId}`);
      return;
    }
    res.json(results);
  });
});

///////////////////////////////////////////////////////////////////////
// 特定のコレクションに関連するすべての記事を取得するエンドポイント => CollectionDetail.jsx
router.get('/collections/:id', (req, res) => {
  const collectionId = req.params.id;
  const sql = 'SELECT * FROM collections WHERE id = ?';

  connection.query(sql, [collectionId], (error, results) => {
    if (error) {
      console.error(`Error fetching collection with id ${collectionId}:`, error);
      res.status(500).send(`Error fetching collection with id ${collectionId}`);
      return;
    }
    if (results.length === 0) {
      res.status(404).send(`Collection with id ${collectionId} not found`);
      return;
    }
    res.json(results[0]);
  });
});

// 特定のコレクションに関連するすべての記事を取得するエンドポイント => CollectionDetail.jsx
router.get('/collections/:id/articles', (req, res) => {
  const collectionId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url
    FROM articles a
    LEFT JOIN brands b ON a.brand_id = b.id
    WHERE a.collection_id = ?
    ORDER BY a.created_at DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(sql, [collectionId, limit, offset], (error, results) => {
    if (error) {
      console.error(`Error fetching articles for collection with id ${collectionId}:`, error);
      res.status(500).send(`Error fetching articles for collection with id ${collectionId}`);
      return;
    }
    connection.query('SELECT COUNT(*) AS totalCount FROM articles WHERE collection_id = ?', [collectionId], (countError, countResults) => {
      if (countError) {
        console.error('Error fetching articles count:', countError);
        res.status(500).send('Error fetching articles count');
        return;
      }
      res.json({ items: results, totalCount: countResults[0].totalCount });
    });
  });
});

router.get('/brands', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url
    FROM articles a
    LEFT JOIN brands b ON a.brand_id = b.id
    WHERE a.genre = 'ブランド'
    ORDER BY a.created_at DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(sql, [limit, offset], (error, results) => {
    if (error) {
      console.error('Error fetching brand articles:', error);
      res.status(500).send('Error fetching brand articles');
      return;
    }
    connection.query('SELECT COUNT(*) AS totalCount FROM articles WHERE genre = ?', ['ブランド'], (countError, countResults) => {
      if (countError) {
        console.error('Error fetching brand articles count:', countError);
        res.status(500).send('Error fetching brand articles count');
        return;
      }
      res.json({ items: results, totalCount: countResults[0].totalCount });
    });
  });
});

// すべてのラジオ記事を取得するエンドポイント => RadioList.jsx
router.get('/radios', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url
    FROM articles a
    LEFT JOIN brands b ON a.brand_id = b.id
    WHERE a.genre = 'ラジオ'
    ORDER BY a.created_at DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(sql, [limit, offset], (error, results) => {
    if (error) {
      console.error('Error fetching radio articles:', error);
      res.status(500).send('Error fetching radio articles');
      return;
    }
    connection.query('SELECT COUNT(*) AS totalCount FROM articles WHERE genre = ?', ['ラジオ'], (countError, countResults) => {
      if (countError) {
        console.error('Error fetching radio articles count:', countError);
        res.status(500).send('Error fetching radio articles count');
        return;
      }
      res.json({ items: results, totalCount: countResults[0].totalCount });
    });
  });
});

// すべてのVlog記事を取得するエンドポイント => VlogList.jsx
router.get('/vlogs', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;  // ページあたりのアイテム数を12に設定
  const offset = (page - 1) * limit;

  const sql = `
    SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url
    FROM articles a
    LEFT JOIN brands b ON a.brand_id = b.id
    WHERE a.genre = 'Vlog'
    ORDER BY a.created_at DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(sql, [limit, offset], (error, results) => {
    if (error) {
      console.error('Error fetching vlog articles:', error);
      res.status(500).send('Error fetching vlog articles');
      return;
    }
    connection.query('SELECT COUNT(*) AS totalCount FROM articles WHERE genre = ?', ['Vlog'], (countError, countResults) => {
      if (countError) {
        console.error('Error fetching vlog articles count:', countError);
        res.status(500).send('Error fetching vlog articles count');
        return;
      }
      res.json({ items: results, totalCount: countResults[0].totalCount });
    });
  });
});

// すべてのGoodsを取得するエンドポイント
router.get('/goods', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT g.id, g.title, g.message, g.created_at, i.url as image_url
    FROM goods g
    LEFT JOIN images i ON g.image_id = i.id
    ORDER BY g.created_at DESC
    LIMIT ? OFFSET ?
  `;

  connection.query(sql, [limit, offset], (error, results) => {
    if (error) {
      console.error('Error fetching goods:', error);
      res.status(500).send('Error fetching goods');
      return;
    }
    res.json(results);
  });
});

// すべての記事を取得するエンドポイント => News.jsx
router.get('/news', (req, res) => {
  const page = req.query.page || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM articles
    ORDER BY created_at DESC
    LIMIT ?, ?
  `;

  connection.query(query, [offset, limit], (err, results) => {
    if (err) {
      console.error('データ取得エラー:', err);
      return res.status(500).json({ error: 'Failed to fetch details' });
    }
    res.json({ items: results });
  });
});

/////////////////////////////////////////////////////////////////////
// 検索エンドポイントの設定
router.get('/search', (req, res) => {
  const { query, page = 1, limit = 12 } = req.query;
  const searchTerms = query.split(' ');
  const offset = (parseInt(page) - 1) * parseInt(limit);

  let sql = `
    SELECT a.id, a.title, a.title_content, a.created_at, a.genre, b.name as brand_name, c.name as collection_name, a.image_url, a.link_url
    FROM articles a
    LEFT JOIN brands b ON a.brand_id = b.id
    LEFT JOIN collections c ON a.collection_id = c.id
    WHERE 1 = 1
  `;

  const params = [];

  searchTerms.forEach(term => {
    sql += ` AND (a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ? OR c.name LIKE ?)`;
    params.push(`%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`);
  });

  sql += ` ORDER BY a.created_at DESC LIMIT ? OFFSET ?`;
  params.push(parseInt(limit), offset);

  connection.query(sql, params, (error, results) => {
    if (error) {
      console.error('Error fetching search results:', error);
      res.status(500).send('Error fetching search results');
      return;
    }

    if (results.length === 1) {
      res.redirect(`/article/${results[0].id}`); 
      return;
    }

    // 結果の総数を取得
    let countSql = `
      SELECT COUNT(*) AS totalCount
      FROM articles a
      LEFT JOIN brands b ON a.brand_id = b.id
      LEFT JOIN collections c ON a.collection_id = c.id
      WHERE 1 = 1
    `;

    const countParams = [];

    searchTerms.forEach(term => {
      countSql += ` AND (a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ? OR c.name LIKE ?)`;
      countParams.push(`%${term}%`, `%${term}%`, `%${term}%`, `%${term}%`);
    });

    connection.query(countSql, countParams, (countError, countResults) => {
      if (countError) {
        console.error('Error fetching search results count:', countError);
        res.status(500).send('Error fetching search results count');
        return;
      }
      res.json({ items: results, totalCount: countResults[0].totalCount });
    });
  });
});

router.get('/article/:articleId', (req, res) => {
  const { articleId } = req.params;
  const sql = `
    SELECT a.*, b.name as brand_name, c.name as collection_name
    FROM articles a
    LEFT JOIN brands b ON a.brand_id = b.id
    LEFT JOIN collections c ON a.collection_id = c.id
    WHERE a.id = ?
  `;

  connection.query(sql, [articleId], (error, results) => {
    if (error) {
      console.error('Error fetching article:', error);
      res.status(500).send('Error fetching article');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Article not found');
      return;
    }

    res.json({ article: results[0] });
  });
});

router.get('/search-suggestions', (req, res) => {
  const { query } = req.query;
  if (!query) {
    res.status(400).send('Query parameter is required');
    return;
  }

  const searchTerm = `%${query}%`;

  const sql = `
    -- ブランド
    SELECT DISTINCT b.name AS name, 'ブランド' AS genre
    FROM brands b
    WHERE b.name LIKE ?
    UNION
    -- コレクション
    SELECT DISTINCT CONCAT(c.name, ' ', c.year, ' ', c.season) AS name, 'コレクション' AS genre
    FROM collections c
    WHERE c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
    UNION
    -- ラジオ
    SELECT DISTINCT a.title AS name, 'ラジオ' AS genre
    FROM articles a
    LEFT JOIN brands b ON a.brand_id = b.id
    WHERE a.genre = 'ラジオ' AND (b.name LIKE ? OR a.title LIKE ? OR a.title_content LIKE ?)
    UNION
    -- Vlog
    SELECT DISTINCT a.title AS name, 'Vlog' AS genre
    FROM articles a
    LEFT JOIN brands b ON a.brand_id = b.id
    WHERE a.genre = 'Vlog' AND (b.name LIKE ? OR a.title LIKE ? OR a.title_content LIKE ?)
    UNION
    -- グッズ
    SELECT DISTINCT g.title AS name, 'グッズ' AS genre
    FROM goods g
    WHERE g.title LIKE ? OR g.message LIKE ?
    ORDER BY genre, name
    LIMIT 10;
  `;

  const params = [
    searchTerm,
    searchTerm, searchTerm, searchTerm,
    searchTerm, searchTerm, searchTerm,
    searchTerm, searchTerm, searchTerm,
    searchTerm, searchTerm
  ];

  connection.query(sql, params, (error, results) => {
    if (error) {
      console.error('Error fetching search suggestions:', error);
      res.status(500).send('Error fetching search suggestions');
      return;
    }

    let modifiedResults = [];

    // 特定の検索語が含まれる場合の処理
    if (['goods', 'グッズ', '商品'].some(term => query.toLowerCase().includes(term))) {
      modifiedResults.push({ name: `${query}`, genre: '商品', link: `/goods` });
    } else {
      // 全ジャンルのリンクを追加
      modifiedResults.push({ name: `${query}`, genre: 'all', link: `/details?query=${encodeURIComponent(query)}&type=all` });

      // 各エントリに適切なリンクを追加
      modifiedResults = modifiedResults.concat(results.map(result => {
        let link = '';
        if (result.genre === 'ブランド') {
          link = `/details?query=${encodeURIComponent(result.name)}&type=Brz`;
        } else if (result.genre === 'コレクション') {
          link = `/details?query=${encodeURIComponent(result.name)}&type=Cll`;
        } else if (result.genre === 'ラジオ') {
          link = `/details?query=${encodeURIComponent(result.name)}&type=Rad`;
        } else if (result.genre === 'Vlog') {
          link = `/details?query=${encodeURIComponent(result.name)}&type=Vlg`;
        } else if (result.genre === 'グッズ') {
          link = `/details?query=${encodeURIComponent(result.name)}&type=Gpp`;
        }
        return { ...result, link };
      }));
    }

    res.json(modifiedResults);
  });
});


const path = require('path');
const fs = require('fs');


// 静的ファイルの提供
router.use('/assets', express.static(path.join(__dirname, '../../../src/assets')));

// エラーハンドリング関数
const handleError = (res, message, error, status = 500) => {
  console.error(`${message}:`, error);
  res.status(status).send(message);
};

// ページネーションを取得する関数
const getPagination = (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const offset = (page - 1) * limit;
  return { page, limit, offset };
};

// manifestの読み込み
let manifest;
const manifestPath = path.join(__dirname, '../../../public/static/asset-manifest.json');

if (fs.existsSync(manifestPath)) {
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    console.log('Asset manifest loaded successfully.');
  } catch (err) {
    console.error('Error reading asset-manifest.json:', err);
    manifest = {};
  }
} else {
  console.warn(`Asset manifest not found at path: ${manifestPath}`);
  manifest = {};
}

// 特定の条件に基づいて記事を取得するエンドポイント
router.get('/details', (req, res) => {
  const { query, type } = req.query;
  const { limit, offset } = getPagination(req);

  let sql = '';
  let countSql = '';
  const params = [];

  const decodedQuery = decodeURIComponent(query).replace(' - 全ジャンル', '').trim();

  if (type === 'Brz') {
    sql = `
      SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url, a.genre
      FROM articles a
      LEFT JOIN brands b ON a.brand_id = b.id
      WHERE b.name = ?
      ORDER BY a.created_at DESC
      LIMIT ? OFFSET ?
    `;
    countSql = `
      SELECT COUNT(*) AS totalCount
      FROM articles a
      LEFT JOIN brands b ON a.brand_id = b.id
      WHERE b.name = ?
    `;
    params.push(decodedQuery, limit, offset);
  } else if (type === 'Cll') {
    sql = `
      SELECT a.id, a.title, a.title_content, a.created_at, c.name as collection_name, a.image_url, a.link_url, a.genre
      FROM articles a
      LEFT JOIN collections c ON a.collection_id = c.id
      WHERE c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
      ORDER BY a.created_at DESC
      LIMIT ? OFFSET ?
    `;
    countSql = `
      SELECT COUNT(*) AS totalCount
      FROM articles a
      LEFT JOIN collections c ON a.collection_id = c.id
      WHERE c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
    `;
    params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
  } else if (type === 'Rad') {
    sql = `
      SELECT a.id, a.title, a.title_content, a.created_at, a.image_url, a.link_url, a.genre
      FROM articles a
      WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ?)
      ORDER BY a.created_at DESC
      LIMIT ? OFFSET ?
    `;
    countSql = `
      SELECT COUNT(*) AS totalCount
      FROM articles a
      WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ?)
    `;
    params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
  } else if (type === 'Vlg') {
    sql = `
      SELECT a.id, a.title, a.title_content, a.created_at, a.image_url, a.link_url, a.genre
      FROM articles a
      WHERE a.genre = 'Vlog' AND (a.title LIKE ? OR a.title_content LIKE ?)
      ORDER BY a.created_at DESC
      LIMIT ? OFFSET ?
    `;
    countSql = `
      SELECT COUNT(*) AS totalCount
      FROM articles a
      WHERE a.genre = 'Vlog' AND (a.title LIKE ? OR a.title_content LIKE ?)
    `;
    params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
  } else if (type === 'Gpp') {
    sql = `
      SELECT g.id, g.title, g.message, g.created_at, g.good_item_link AS link_url
      FROM goods g
      WHERE g.title LIKE ? OR g.message LIKE ?
      ORDER BY g.created_at DESC
      LIMIT ? OFFSET ?
    `;
    countSql = `
      SELECT COUNT(*) AS totalCount
      FROM goods g
      WHERE g.title LIKE ? OR g.message LIKE ?
    `;
    params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
  } else {
    sql = `
      SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, c.name as collection_name, a.image_url, a.link_url, a.genre
      FROM articles a
      LEFT JOIN brands b ON a.brand_id = b.id
      LEFT JOIN collections c ON a.collection_id = c.id
      WHERE a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ? OR c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
      ORDER BY a.created_at DESC
      LIMIT ? OFFSET ?
    `;
    countSql = `
      SELECT COUNT(*) AS totalCount
      FROM articles a
      LEFT JOIN brands b ON a.brand_id = b.id
      LEFT JOIN collections c ON a.collection_id = c.id
      WHERE a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ? OR c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
    `;
    params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
  }

  connection.query(sql, params, (error, results) => {
    if (error) return handleError(res, 'Error fetching details', error);

    if (type === 'Gpp' && results.length > 0) {
      res.redirect(results[0].link_url);
      return;
    }

    results.forEach(article => {
      if (article.image_url) {
        // ここでデータベースのパスを静的ファイルのパスに変換
        article.image_url = `/assets/images/${path.basename(article.image_url)}`;
      }
    });

    connection.query(countSql, params.slice(0, -2), (countError, countResults) => {
      if (countError) return handleError(res, 'Error fetching details count', countError);
      res.json({ items: results, totalCount: countResults[0].totalCount });
    });
  });
});


// 特定の条件に基づいて記事を取得するエンドポイント => Detail.jsx
// router.get('/details', (req, res) => {
//   const { query, type } = req.query;
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 12;
//   const offset = (page - 1) * limit;

//   let sql = '';
//   let countSql = '';
//   const params = [];

//   // クエリパラメータのデコード
//   const decodedQuery = decodeURIComponent(query).replace(' - 全ジャンル', '').trim();

//   console.log(`Query: ${decodedQuery}, Type: ${type}`); // デバッグ情報

//   if (type === 'Brz') {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url, a.genre
//       FROM articles a
//       LEFT JOIN brands b ON a.brand_id = b.id
//       WHERE b.name = ?
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       LEFT JOIN brands b ON a.brand_id = b.id
//       WHERE b.name = ?
//     `;
//     params.push(decodedQuery, limit, offset);
//   } else if (type === 'Cll') {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, c.name as collection_name, a.image_url, a.link_url, a.genre
//       FROM articles a
//       LEFT JOIN collections c ON a.collection_id = c.id
//       WHERE c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       LEFT JOIN collections c ON a.collection_id = c.id
//       WHERE c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   } else if (type === 'Rad') {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, a.image_url, a.link_url, a.genre
//       FROM articles a
//       WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ?)
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ?)
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   } else if (type === 'Vlg') {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, a.image_url, a.link_url, a.genre
//       FROM articles a
//       WHERE a.genre = 'Vlog' AND (a.title LIKE ? OR a.title_content LIKE ?)
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       WHERE a.genre = 'Vlog' AND (a.title LIKE ? OR a.title_content LIKE ?)
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   } else if (type === 'Gpp') {
//     sql = `
//       SELECT g.id, g.title, g.message, g.created_at, g.good_item_link AS link_url
//       FROM goods g
//       WHERE g.title LIKE ? OR g.message LIKE ?
//       ORDER BY g.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM goods g
//       WHERE g.title LIKE ? OR g.message LIKE ?
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   } else {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, c.name as collection_name, a.image_url, a.link_url, a.genre
//       FROM articles a
//       LEFT JOIN brands b ON a.brand_id = b.id
//       LEFT JOIN collections c ON a.collection_id = c.id
//       WHERE a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ? OR c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       LEFT JOIN brands b ON a.brand_id = b.id
//       LEFT JOIN collections c ON a.collection_id = c.id
//       WHERE a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ? OR c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   }

//   connection.query(sql, params, (error, results) => {
//     if (error) {
//       console.error('Error fetching details:', error);
//       res.status(500).send('Error fetching details');
//       return;
//     }

//     if (type === 'Gpp' && results.length > 0) {
//       // グッズの場合、直接リンクにリダイレクト
//       res.redirect(results[0].link_url);
//       return;
//     }

//     connection.query(countSql, params.slice(0, -2), (countError, countResults) => {
//       if (countError) {
//         console.error('Error fetching details count:', countError);
//         res.status(500).send('Error fetching details count');
//         return;
//       }
//       res.json({ items: results, totalCount: countResults[0].totalCount });
//     });
//   });
// });

// router.get('/details', (req, res) => {
//   const { query, type } = req.query;
//   console.log(`Query: ${query}, Type: ${type}`); // デバッグ情報
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 12;
//   const offset = (page - 1) * limit;

//   let sql = '';
//   let countSql = '';
//   const params = [];

//   const decodedQuery = decodeURIComponent(query || '').replace(' - 全ジャンル', '').trim();

//   if (type === 'Brz') {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url, a.genre
//       FROM articles a
//       LEFT JOIN brands b ON a.brand_id = b.id
//       WHERE b.name = ?
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       LEFT JOIN brands b ON a.brand_id = b.id
//       WHERE b.name = ?
//     `;
//     params.push(decodedQuery, limit, offset);
//   } else if (type === 'Cll') {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, c.name as collection_name, a.image_url, a.link_url, a.genre
//       FROM articles a
//       LEFT JOIN collections c ON a.collection_id = c.id
//       WHERE c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       LEFT JOIN collections c ON a.collection_id = c.id
//       WHERE c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   } else if (type === 'Rad') {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, a.image_url, a.link_url, a.genre
//       FROM articles a
//       WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ?)
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ?)
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   } else if (type === 'Vlg') {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, a.image_url, a.link_url, a.genre
//       FROM articles a
//       WHERE a.genre = 'Vlog' AND (a.title LIKE ? OR a.title_content LIKE ?)
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       WHERE a.genre = 'Vlog' AND (a.title LIKE ? OR a.title_content LIKE ?)
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   } else if (type === 'Gpp') {
//     sql = `
//       SELECT g.id, g.title, g.message, g.created_at, g.good_item_link AS link_url
//       FROM goods g
//       WHERE g.title LIKE ? OR g.message LIKE ?
//       ORDER BY g.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM goods g
//       WHERE g.title LIKE ? OR g.message LIKE ?
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   } else {
//     sql = `
//       SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, c.name as collection_name, a.image_url, a.link_url, a.genre
//       FROM articles a
//       LEFT JOIN brands b ON a.brand_id = b.id
//       LEFT JOIN collections c ON a.collection_id = c.id
//       WHERE a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ? OR c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
//       ORDER BY a.created_at DESC
//       LIMIT ? OFFSET ?
//     `;
//     countSql = `
//       SELECT COUNT(*) AS totalCount
//       FROM articles a
//       LEFT JOIN brands b ON a.brand_id = b.id
//       LEFT JOIN collections c ON a.collection_id = c.id
//       WHERE a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ? OR c.name LIKE ? OR c.year LIKE ? OR c.season LIKE ?
//     `;
//     params.push(`%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, `%${decodedQuery}%`, limit, offset);
//   }

//   connection.query(sql, params, (error, results) => {
//     if (error) {
//       console.error('Error fetching details:', error);
//       res.status(500).send('Error fetching details');
//       return;
//     }

//     if (type === 'Gpp' && results.length > 0) {
//       res.redirect(results[0].link_url);
//       return;
//     }
    
//     results.forEach(article => {
//       article.image_url = `/assets/images/${path.basename(article.image_url)}`;
//     });

//     connection.query(countSql, params.slice(0, -2), (countError, countResults) => {
//       if (countError) {
//         console.error('Error fetching details count:', countError);
//         res.status(500).send('Error fetching details count');
//         return;
//       }
//       res.json({ items: results, totalCount: countResults[0].totalCount });
//     });
//   });
// });

module.exports = router;

///////////////////////////////////////////////////////////////////////
// すべてのブランド記事を取得するエンドポイント => BrandList.jsx
// router.get('/brands', (req, res) => {
//   const query = req.query.query || '';
//   console.log('Received query:', query); // クエリパラメータのログ出力
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 12;
//   const offset = (page - 1) * limit;

//   let sql = `
//     SELECT a.id, a.title, a.title_content, a.created_at, a.genre, b.name as brand_name, a.image_url, a.link_url
//     FROM articles a
//     LEFT JOIN brands b ON a.brand_id = b.id
//     WHERE b.name LIKE ? 
//     ORDER BY a.created_at DESC
//     LIMIT ? OFFSET ?
//   `;
//   const params = [`%${query}%`, limit, offset];

//   connection.query(sql, params, (error, results) => {
//     if (error) {
//       console.error('Error fetching brand articles:', error);
//       res.status(500).send('Error fetching brand articles');
//       return;
//     }
//     console.log('Fetched results:', results);

//     if (results.length === 1) {
//       const article = results[0];
//       const templateFileName = `${String(article.id).padStart(4, '0')}.ejs`;
//       const templatePath = path.join(__dirname, 'src/services/blogs/data', templateFileName);
//       res.render(templatePath, { article });
//     } else {
//       connection.query(
//         'SELECT COUNT(*) AS totalCount FROM articles a LEFT JOIN brands b ON a.brand_id = b.id WHERE b.name LIKE ?',
//         [`%${query}%`],
//         (countError, countResults) => {
//           if (countError) {
//             console.error('Error fetching brand articles count:', countError);
//             res.status(500).send('Error fetching brand articles count');
//             return;
//           }
//           console.log('Total count:', countResults[0].totalCount);
//           res.json({ items: results, totalCount: countResults[0].totalCount });
//         }
//       );
//     }
//   });
// });

// router.get('/radios', (req, res) => {
//   const query = req.query.query || '';
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 12;
//   const offset = (page - 1) * limit;

//   let sql = `
//     SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url
//     FROM articles a
//     LEFT JOIN brands b ON a.brand_id = b.id
//     WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ?)
//     ORDER BY a.created_at DESC
//     LIMIT ? OFFSET ?
//   `;
//   const params = [`%${query}%`, `%${query}%`, `%${query}%`, limit, offset];

//   connection.query(sql, params, (error, results) => {
//     if (error) {
//       console.error('Error fetching radio articles:', error);
//       res.status(500).send('Error fetching radio articles');
//       return;
//     }

//     if (results.length === 1) {
//       const article = results[0];
//       const templateFileName = `${String(article.id).padStart(4, '0')}.ejs`;
//       const templatePath = path.join(__dirname, 'src/services/blogs/data', templateFileName);
//       res.render(templatePath, { article });
//     } else {
//       connection.query(
//         `SELECT COUNT(*) AS totalCount 
//          FROM articles a
//          LEFT JOIN brands b ON a.brand_id = b.id 
//          WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ?)`,
//         [`%${query}%`, `%${query}%`, `%${query}%`],
//         (countError, countResults) => {
//           if (countError) {
//             console.error('Error fetching radio articles count:', countError);
//             res.status(500).send('Error fetching radio articles count');
//             return;
//           }
//           res.json({ items: results, totalCount: countResults[0].totalCount });
//         }
//       );
//     }
//   });
// });

// // すべてのraido記事を取得するエンドポイント => RadioList.jsx
// router.get('/radios', (req, res) => {
//   const query = req.query.query || '';
//   console.log('Received query:', query); // クエリパラメータのログ出力
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 12;
//   const offset = (page - 1) * limit;

//   let sql = `
//     SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url
//     FROM articles a
//     LEFT JOIN brands b ON a.brand_id = b.id
//     WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ?)
//     ORDER BY a.created_at DESC
//     LIMIT ? OFFSET ?
//   `;
//   const params = [`%${query}%`, `%${query}%`, `%${query}%`, limit, offset];

//   connection.query(sql, params, (error, results) => {
//     if (error) {
//       console.error('Error fetching radio articles:', error);
//       res.status(500).send('Error fetching radio articles');
//       return;
//     }

//     if (results.length === 1) {
//       const article = results[0];
//       const templateFileName = `${String(article.id).padStart(4, '0')}.ejs`;
//       const templatePath = path.join(__dirname, 'src/services/blogs/data', templateFileName);
//       res.render(templatePath, { article });
//     } else {
//       connection.query(
//         `SELECT COUNT(*) AS totalCount 
//          FROM articles a
//          LEFT JOIN brands b ON a.brand_id = b.id 
//          WHERE a.genre = 'ラジオ' AND (a.title LIKE ? OR a.title_content LIKE ? OR b.name LIKE ?)`,
//         [`%${query}%`, `%${query}%`, `%${query}%`],
//         (countError, countResults) => {
//           if (countError) {
//             console.error('Error fetching radio articles count:', countError);
//             res.status(500).send('Error fetching radio articles count');
//             return;
//           }
//           res.json({ items: results, totalCount: countResults[0].totalCount });
//         }
//       );
//     }
//   });
// });


// // すべてのvlog記事を取得するエンドポイント => VlogList.jsx
// router.get('/vlogs', (req, res) => {
//   const query = req.query.query || '';
//   const page = parseInt(req.query.page) || 1;
//   const limit = parseInt(req.query.limit) || 12;
//   const offset = (page - 1) * limit;

//   let sql = `
//     SELECT a.id, a.title, a.title_content, a.created_at, b.name as brand_name, a.image_url, a.link_url
//     FROM articles a
//     LEFT JOIN brands b ON a.brand_id = b.id
//     WHERE a.title LIKE ? AND a.genre = 'Vlog'
//     ORDER BY a.created_at DESC
//     LIMIT ? OFFSET ?
//   `;
//   const params = [`%${query}%`, limit, offset];

//   connection.query(sql, params, (error, results) => {
//     if (error) {
//       console.error('Error fetching vlog articles:', error);
//       res.status(500).send('Error fetching vlog articles');
//       return;
//     }

//     if (results.length === 1) {
//       const article = results[0];
//       const templateFileName = `${String(article.id).padStart(4, '0')}.ejs`;
//       const templatePath = path.join(__dirname, 'src/services/blogs/data', templateFileName);
//       res.render(templatePath, { article });
//     } else {
//       connection.query(
//         'SELECT COUNT(*) AS totalCount FROM articles WHERE title LIKE ? AND genre = \'Vlog\'',
//         [`%${query}%`],
//         (countError, countResults) => {
//           if (countError) {
//             console.error('Error fetching vlog articles count:', countError);
//             res.status(500).send('Error fetching vlog articles count');
//             return;
//           }
//           res.json({ items: results, totalCount: countResults[0].totalCount });
//         }
//       );
//     }
//   });
// });

//こっちが元の。
// すべてのブランド記事を取得するエンドポイント => BrandList.jsx
