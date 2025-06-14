export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // 1. Ловим /article-public/<id> и /article-public/<id>/
    const match = url.pathname.match(/^\/article-public\/(\d+)\/?$/);
    if (match) {
      const id = match[1];

      // 2. Получаем публичные метаданные из Xano
      const meta = await fetch(
        `https://xdil-abvj-o7rq.e2.xano.io/api:d9B0M9b/public_content_article_metadata/${id}`
      ).then(r => r.json() as Promise<{
        title: string;
        description: string;
        image?: string;
      }>);

      // 3. Собираем минимальный HTML с OG-тегами и JS-редиректом
      const html = `<!doctype html><html lang="en"><head>
        <meta charset="utf-8">
        <title>${meta.title}</title>
        <meta property="og:title" content="${meta.title}">
        <meta property="og:description" content="${meta.description}">
        <meta property="og:image" content="${meta.image ?? ""}">
        <meta property="og:url" content="https://www.asymmetrixintelligence.com/article-public/${id}">
        <meta name="twitter:card" content="summary_large_image">
        <meta http-equiv="refresh" content="0;url=https://www.asymmetrixintelligence.com/article-public/${id}">
      </head><body></body></html>`;

      return new Response(html, {
        status: 200,
        headers: { "content-type": "text/html; charset=utf-8" }
      });
    }

    // 4. Всё остальное — проксируем на CloudFront
    url.hostname = "d2rmojcfi76x8t.cloudfront.net";
    return fetch(url.toString(), request);
  }
};
