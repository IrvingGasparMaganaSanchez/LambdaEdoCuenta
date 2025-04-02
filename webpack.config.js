const path = require('path'); 
 
module.exports = { 
  entry: './src/server/index.js', // Cambia esto a tu archivo de entrada 
  externals: [
    '@aws-sdk/client-kms',
    '@aws-sdk/client-s3',
    '@newrelic/winston-enricher',
    'archiver',
    'archiver-zip-encrypted',
    'aws-sdk',
    'axios',
    'bwip-js',
    'dotenv',
    'handlebars',
    'moment-timezone',
    'mongoose',
    'newrelic',
    'puppeteer',
    'uuid',
    'winston'
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