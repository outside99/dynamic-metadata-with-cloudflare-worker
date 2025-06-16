export const config = {
  domainSource: "https://www.asymmetrixintelligence.com",
  patterns: [
    {
      // ловим только страницы article-public/<id>
      pattern: "^/article-public/\\d+/?$",
      metaDataEndpoint:
        "https://xdil-abvj-o7rq.e2.xano.io/api:d9B0M9b/public_content_article_metadata/{content_id}"
    }
  ]
};
