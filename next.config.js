const path = require("path");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // See: https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
    // See: https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW
    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        swDest: path.join(__dirname, "/public/service-worker.js"),
        modifyURLPrefix: {
          "static/": "_next/static/",
        },
        exclude: [
          "build-manifest.json",
          "react-loadable-manifest.json",
          "_error.js",
        ],
        maximumFileSizeToCacheInBytes: 2097152,
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
      })
    );

    return config;
  },
};
