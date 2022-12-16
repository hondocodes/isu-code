const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

// const host = 'site.localhost';
const pages = ['index', 'home', 'secondary', 'secondary-no-announcement', 'tertiary', 'tertiary-no-hero', 'admissions', 'cost-aid', 'student-life', 'program-finder', 'program', 'college-landing', 'faculty-listing', 'faculty-bio', 'news-post'];

const config = {
  entry: {
    main: ['./src/css/main.css', './src/js/main.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  devServer: {
    hot: true,
    open: true,
    watchFiles: ['src/html/**/*'],
  },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.html$/,
        type: 'asset/source',
        use: [
          {
            loader: 'twig-html-loader',
            options: {
              namespaces: {
                layouts: path.resolve(__dirname, 'src/html/layouts'),
                components: path.resolve(__dirname, 'src/html/components'),
                util: path.resolve(__dirname, 'src/html/util'),
              },
              extend(Twig) {
                Twig.exports.extendFunction('inline_svg', (img, cls = '') => `
                  <span class="svg svg--${img} ${cls}">
                    ${Twig.functions.source(`./src/svg/${img}.svg`)}
                  </span>
                `);
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/source',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-hexrgba',
                  'postcss-import-ext-glob',
                  'postcss-import',
                  'postcss-mixins',
                  'postcss-root-var',
                  'postcss-nested',
                  ['postcss-preset-env', {
                    features: {
                      'custom-media-queries': true,
                      'custom-selectors': true,
                      'logical-properties-and-values': false,
                      // 'nesting-rules': true,
                    },
                  }],
                  ['postcss-inline-svg', {
                    paths: ['src/svg'],
                  }],
                  'tailwindcss/nesting',
                  ['tailwindcss', {}],
                  ['autoprefixer', {}],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        include: /src\/js/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
              }],
            ],
            plugins: [
              ['@babel/plugin-transform-react-jsx', {
                pragma: 'h',
                pragmaFrag: 'Fragment',
              }],
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
  },
  plugins: [
    ...(pages.map((file) => new HtmlWebpackPlugin({
      filename: `${file}.html`,
      template: `src/html/${file}.html`,
    }))),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/img',
          to: 'img',
          noErrorOnMissing: true,
        },
        {
          from: 'src/svg',
          to: 'svg',
          noErrorOnMissing: true,
        },
        {
          from: 'src/fonts',
          to: 'fonts',
          noErrorOnMissing: true,
        },
        {
          from: 'src/json',
          to: 'json',
          noErrorOnMissing: true,
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
    },
  },
  target: ['web', 'es5'],
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.plugins.unshift(new CleanWebpackPlugin());
  }
  return config;
};
