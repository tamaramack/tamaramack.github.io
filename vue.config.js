module.exports = {
  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: '0',
      region: 'us-west-2',
      bucket: 'tamaramack-data',
      createBucket: false,
      staticHosting: true,
      staticIndexPage: 'index.html',
      staticErrorPage: 'index.html',
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

  publicPath: undefined,
  outputDir: process.env.NODE_ENV !== 'production' ? 'dev-build' : 'dist',
  assetsDir: 'content',
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  crossorigin: 'anonymous',
  lintOnSave: process.env.NODE_ENV !== 'production' && true,
  devServer: {
    port: 9100,
    // https: true,
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
        localIdentName: '[name]_[local]_[hash:base64]',
        modules: false,
        camelCase: false
      },
      sass: {
        data: '@import "~@/css/settings.scss", "~foundation-sites/scss/foundation";'
      }
    }
  }
};
