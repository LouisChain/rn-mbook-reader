import RNFetchBlob from "rn-fetch-blob";
import md5 from "md5";

// const { config, fs } = RNFetchBlob
// let PictureDir = fs.dirs.PictureDir // this is the pictures directory. You can check the available directories in the wiki.
// let options = {
//   fileCache: true,
//   addAndroidDownloads : {
//     useDownloadManager : true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
//     notification : false,
//     path:  PictureDir + "/me_"+Math.floor(date.getTime() + date.getSeconds() / 2), // this is the path where your downloaded file will live in
//     description : 'Downloading image.'
//   }
// }
// config(options).fetch('GET', "http://www.example.com/example.pdf").then((res) => {
//   // do some magic here
// })
const instance = {};
const dirs = RNFetchBlob.fs.dirs;

const hasKey = key => {
  return key in instance;
};

const remove = key => {
  if (hasKey(key)) {
    delete instance[key];
  }
};

const put = (key, task) => {
  if (!hasKey(key)) {
    instance[key] = task;
  }
};

const get = key => {
  if (hasKey(key)) {
    return instance[key];
  } else {
    return undefined;
  }
};

const getPath = (url, bookId) => {
  return dirs.DocumentDir + "/" + bookId + "/" + md5(url) + ".mp3";
};

const wasDownloaded = (url, bookId) => {
  return RNFetchBlob.fs.exists(getPath(url, bookId));
};

const deleteBook = bookId => {
  let base = dirs.DocumentDir + "/" + bookId + "/";
  RNFetchBlob.fs.unlink(base).catch(err => {
    console.log(err + "");
  });
};

// this is return a Promise
const downloadToCache = url => {
  let cache = {
    fileCache: true
  };
  return RNFetchBlob.config(cache).fetch("GET", url);
  // listen to download progress event, every 10%
  // .progress({ count: 10 }, (received, total) => {
  //   console.log('progress', received / total)
  // })
};

const download = (url, bookId) => {
  let option = {
    path: getPath(url, bookId)
  };
  let task = RNFetchBlob.config(option).fetch("GET", url);
  put(url, task);
  return task;
};

export {
  get,
  put,
  remove,
  downloadToCache,
  download,
  wasDownloaded,
  getPath,
  deleteBook
};
