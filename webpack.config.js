const path = require('path'); 
 
module.exports = { 
  entry: './src/server/index.js', // Cambia esto a tu archivo de entrada 
  externals: [
    '@aws-sdk/client-s3',
    '@aws-sdk/credential-providers',
    '@newrelic/winston-enricher',
    '@aws-sdk/client-ssm',
    'axios',
    'moment-timezone',
    'mongoose',
    'newrelic',
    'winston',
    'uuid'
  ],
  externalsType: 'node-commonjs',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.spec.js$/,
        use: 'babel-loader',
      },
    ],
  },
  output: { 
    filename: 'index.js', 
    path: path.resolve(__dirname, 'dist') 
  }, 
  resolve: {
    extensions: ['.js'],
  },
  target: 'node', 
  mode: 'production' 
};