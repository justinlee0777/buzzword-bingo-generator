const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const config = {
  entry: {
    index: './src/index.tsx',
  },
  output: {
    library: {
      name: 'BuzzwordBingo',
      type: 'commonjs',
      export: 'default',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {},
        },
      },
      {
        test: /\.css$/i,
        use: [
          // Translates CSS into CommonJS
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              import: false,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  externals: ['react'],
  plugins: [new MiniCssExtractPlugin()],
};

module.exports = (_, argv) => {
  if (argv.mode === 'development') {
    const module = { ...config.module };
    module.rules[0].use.options.configFile = './tsconfig.dev.json';

    const override = {
      output: {
        ...config.output,
        library: {
          ...config.output.library,
          type: 'var',
        },
      },
      entry: {
        buzzwordBingo: './src/index.tsx',
        index: './index.tsx',
      },
      module,
      plugins: config.plugins.concat(
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './index.html'),
          title: 'Buzzword Bingo Generator',
        })
      ),
      externals: [],
      optimization: {
        minimize: false,
      },
      devtool: 'source-map',
    };

    return { ...config, ...override };
  } else {
    const override = {
      plugins: config.plugins.concat(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: './package.json',
              transform: (content) => {
                const json = JSON.parse(content.toString());

                // The current distribution has no dependencies.
                delete json.dependencies;
                delete json.devDependencies;

                // Why not delete the scripts at this point.
                delete json.scripts;

                return JSON.stringify(json);
              },
            },
          ],
        })
      ),
    };

    return { ...config, ...override };
  }
};
