module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false,
            },
          },
        ],
      },
    },
  },
  typescript: {
    enableTypeChecking: true,
  },
  babel: {
    presets: [
      /* ... */
    ],
    plugins: [
      /* ... */
    ],
    loaderOptions: (babelLoaderOptions, { env, paths }) => {
      /* ... */
      return babelLoaderOptions;
    },
  },
};
// changed to cjs
