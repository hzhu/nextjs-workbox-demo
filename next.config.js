const path = require("path");
const WorkboxPlugin = require("workbox-webpack-plugin");

const publicPath = path.join(__dirname, "public");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // See: https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    // See: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        swDest: path.join(publicPath, "service-worker"),
        modifyURLPrefix: {
          "static/": "_next/static/",
          "public/": "/",
          "pages/api/hello.js": "/api/hello",
        },
        exclude: [
          "build-manifest.json",
          "react-loadable-manifest.json",
          "pages/*",
          "pages/index.js",
          "pages/_error.js",
          "init-server.js.js",
          "on-error-server.js.js",
          "pages-manifest",
          "init-server.js",
        ],
        maximumFileSizeToCacheInBytes: 2097152 * 10,
        runtimeCaching: [
          {
            urlPattern: /^https?.*/,
            handler: "NetworkFirst",
            options: {
              cacheName: "offlineCache",
              expiration: {
                maxEntries: 200,
              },
            },
          },
        ],
        // See: https://webpack.js.org/guides/progressive-web-application/#adding-workbox
        clientsClaim: true,
        skipWaiting: true,
        cleanupOutdatedCaches: true,
      })
    );

    return config;
  },
};
