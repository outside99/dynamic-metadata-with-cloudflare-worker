export default {
  async fetch(req) {
    const url = new URL(req.url);

    // 1) Ловим /article-public/ID или /article-public/ID/
    const m = url.pathname.match(/^\/article-public\/(\d+)\/?$/);
    if (m) {
      const id = m[1];

      // 2) Берём метаданные из публичного Xano
      const meta = await fetch(
        `https://xdil-abvj-o7rq.e2.xano.io/api:d9B0M9b/public_content_article_metadata/${id}`
      ).then(r => r.json());

      // 3) Генерируем минимальный HTML-превью
      const ogHtml = `<!doctype html><html lang="en"><head>
        <meta charset="utf-8">
        <title>${meta.title}</title>
        <meta property="og:title" content="${meta.title}">
        <meta property="og:description" content="${meta.description}">
        <meta property="og:image" content="${meta.image ?? ""}">
        <meta property="og:url" content="https://www.asymmetrixintelligence.com/article-public/${id}">
        <meta name="twitter:card" content="summary_large_image">
        <meta http-equiv="refresh" content="0;url=https://www.asymmetrixintelligence.com/article-public/${id}">
      </head><body></body></html>`;

      return new Response(ogHtml, {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    }

    // 4) Всё остальное – напрямую на CloudFront
    url.hostname = "d2rmojcfi76x8t.cloudfront.net";
    return fetch(url, req);
  }
}
