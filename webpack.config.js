const path = require('path');

module.exports = {
  // Entry point for your application
  entry: './src/main.js',

  // Output configuration for the bundled file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Cleans the output directory before emitting files
  },

  // Module rules for handling different file types
  module: {
    rules: [
      {
        test: /\.js$/,           // Transpile all .js files
        exclude: /node_modules/,   // except those in node_modules
        use: 'babel-loader',       // using babel-loader
      },
    ],
  },

  // Provide fallbacks for Node.js core modules required by ethers.js
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      assert: require.resolve('assert/'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      url: require.resolve('url/'),
    },
  },

  // Development server configuration using the new "static" property
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'), // Serve static files from the "public" folder
    },
    compress: true, // Enable gzip compression
    port: 9000,     // Serve on port 9000
    open: true,     // Automatically open the browser
  },
};
