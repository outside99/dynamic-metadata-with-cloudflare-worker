export const config = {
  domainSource: "https://www.asymmetrixintelligence.com",
  patterns: [
    {
      // достаём только цифровой сегмент
      pattern: "^/article-public/(\\d+)/?$",
      metaDataEndpoint:
        "https://xdil-abvj-o7rq.e2.xano.io/api:d9B0M9b/public_content_article_metadata/{content_id}"
    }
  ]
};

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    const path = url.pathname;            // e.g. "/article-public/11/"
    console.log(`Worker started for ${path}`);

    // --- 1) вытягиваем ID из path ---
    const match = path.match(/^\/article-public\/(\d+)\/?$/);
    let metadata: any = null;
    if (match) {
      const contentId = match[1];
      console.log(`Fetching metadata for ID ${contentId}`);
      // --- 2) вызываем Xano (если нужно) ---
      const metaRes = await fetch(
        config.patterns[0].metaDataEndpoint.replace("{content_id}", contentId)
      );
      metadata = await metaRes.json();
      console.log("Metadata received:", metadata);
    }

    // --- 3) прокидываем запрос на origin и возвращаем HTML ---
    const originResponse = await fetch(
      config.domainSource + path,
      {
        // сохраняем метод, заголовки, куки и т.п.
        headers: request.headers,
        redirect: "manual"
      }
    );

    // Если вам нужно вставить теги <meta> в <head>, вы можете прочитать
    // originResponse.text(), модифицировать строку и вернуть новый Response.
    // Для начала — просто прокидываем «как есть»:
    return new Response(originResponse.body, {
      status: originResponse.status,
      statusText: originResponse.statusText,
      headers: originResponse.headers
    });
  }
};
