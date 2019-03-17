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

  pwa: {
    name: 'ConfigureThis'
  },

  publicPath: undefined,
  outputDir: undefined,
  assetsDir: 'content',
  runtimeCompiler: true,
  productionSourceMap: undefined,
  parallel: undefined,
  crossorigin: 'anonymous',

  css: {
    modules: true
  }
};
