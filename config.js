export const config = {
  domainSource: "https://www.asymmetrixintelligence.com/", // Your WeWeb app preview link
  patterns: [
      {
          pattern: "^/article-public/(\\d+)/?$",
          metaDataEndpoint: "https://xdil-abvj-o7rq.e2.xano.io/api:d98b0M9b/public_content_article_matadate/{content_id}"
      }
      // Add more patterns and their metadata endpoints as needed
  ]
};
