const configureAPI = require('./api/configure');
const packageJson = require('./package.json');

module.exports = {
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: '0',
      region: 'us-west-2',
      bucket: process.env.S3_BUCKET,
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'error.html',
      assetPath: 'dist',
      assetMatch: '**',
      deployPath: '/app',
      acl: 'public-read',
      pwa: false,
      enableCloudfront: false,
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        zf: 'foundation-sites/js'
      }
    }
  },

  pwa: {
    name: 'ConfigureThis'
  },

  pages: {
    index: {
      // entry for the page
      entry: 'src/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    // subpage: 'src/subpage/main.js'
  },

  publicPath: undefined,
  outputDir: process.env.NODE_ENV !== 'production' ? 'devdist' : 'dist',
  assetsDir: 'lib',
  runtimeCompiler: true,
  filenameHashing: true,
  productionSourceMap: true,
  parallel: undefined,
  integrity: false,
  crossorigin: 'anonymous',
  lintOnSave: process.env.NODE_ENV !== 'production' && true,

  devServer: {
    port: packageJson.config.port || process.env.PORT,
    // https: true,
    before: configureAPI,
    overlay: {
      warnings: true,
      errors: true
    },
    headers: {
      ...(process.env.NODE_ENV !== 'production' && {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers': '*'
      })
    }
  },

  css: {
    modules: true,
    loaderOptions: {
      css: {
        // localIdentName: '[name]_[local]_[hash:base64]',
        localIdentName: '[local]_[hash:base64]',
        camelCase: false
      },
      sass: {
        data: '@import "~@/css/.sys/settings.scss", "~foundation-sites/scss/foundation";'
      }
    }
  }
};
