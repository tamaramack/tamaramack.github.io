/**
 * aws-s3 file for tamaramack.github.io on 08-Jul-17.
 * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
 * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
 * http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getObject-property
 */
const path = require('path');

module.exports = function _s3() {
  const s3 = require('s3');
  const bucket = '',
    defaultDirPrefix = '',
    client = s3.createClient({
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: ''
      }
    });

  /**
   *
   * @param filename
   * @param localPath
   * @param remotePath
   * @param customBucket
   */
  function upload(
    filename,
    localPath,
    remotePath = defaultDirPrefix,
    customBucket = bucket
  ) {
    const params = {
      localFile: path.join(localPath, filename),
      s3Params: {
        Bucket: customBucket,
        Key: path.join(remotePath, filename)
      }
    };
    const uploader = client.uploadFile(params);
    uploader.on('error', (err) => {
      console.error('unable to upload:', err.stack);
    });
    uploader.on('progress', () => {
      console.log('progress', uploader.progressMd5Amount,
        uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on('end', () => {
      console.log('done uploading');
    });
  }

  /**
   *
   * @param filename
   * @param localPath
   * @param remotePath
   * @param customBucket
   */
  function download(
    filename,
    localPath,
    remotePath = defaultDirPrefix,
    customBucket = bucket
  ) {
    const params = {
      localFile: path.join(localPath, filename),
      s3Params: {
        Bucket: customBucket,
        Key: path.join(remotePath, filename)
      }
    };
    const downloader = client.downloadFile(params);
    downloader.on('error', (err) => {
      console.error('unable to download:', err.stack);
    });
    downloader.on('progress', () => {
      console.log('progress', downloader.progressAmount,
        downloader.progressTotal);
    });
    downloader.on('end', () => {
      console.log('done downloading');
    });
  }

  /**
   *
   * @param localPath
   * @param remotePath
   * @param customBucket
   */
  function directoryUpload(
    localPath,
    remotePath = defaultDirPrefix,
    customBucket = bucket
  ) {
    const params = {
      localDir: localPath,
      deleteRemoved: true, // default false, whether to remove s3 objects
      // that have no corresponding local file.
      s3Params: {
        Bucket: customBucket,
        Prefix: remotePath
      }
    };
    const uploader = client.uploadDir(params);
    uploader.on('error', (err) => {
      console.error('unable to sync:', err.stack);
    });
    uploader.on('progress', () => {
      console.log('progress', uploader.progressAmount, uploader.progressTotal);
    });
    uploader.on('end', () => {
      console.log('done uploading');
    });
  }

  return {
    uploadFile: upload,
    downloadFile: download,
    uploadDir: directoryUpload
  };
};
