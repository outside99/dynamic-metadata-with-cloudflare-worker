export const config = {
  domainSource: "https://f69a71f6-9fd8-443b-a040-78beb5d404d4.weweb-preview.io", // Your WeWeb app preview link
  patterns: [
      {
          pattern: "/article/[^/]+",
          metaDataEndpoint: "https://xdil-abvj-o7rq.e2.xano.io/api:Z3F6JUiu/public_content_article_matadate"
      }
      // Add more patterns and their metadata endpoints as needed
  ]
};
