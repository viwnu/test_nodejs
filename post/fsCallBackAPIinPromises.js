const fs = require("fs");

let dataFile = 'test.txt';
const buf = new Buffer.alloc(16);

let openPromise = new Promise((resolve, reject) => {
  fs.open(dataFile, 'a+', (err, fd) => {
    // err = new Error(`I am the ERROR`);
    if (err) {
      console.log(`error is detected: ${err}`);
      reject(err);
    } else {
      console.log(`-1. File opened: ${fd}`);
      resolve(fd);
    };
  });
});

openPromise
  .then((fd) => {
    console.log(fd);
    return new Promise((resolve, reject) => {
      console.log(fd);
      fs.read(fd, buf, 0, buf.length, 44, function(err, bytes) {
        // err = new Error(`q`1 `qaI am the ERROR`);
        if (err){
          err.message = err.message + ' some shiiiiiit';
           console.log(err);
           reject(err);
        }
        console.log(`-2. position in fs.read is: ${44}`);
        console.log(`-2.1. the something from the file:\n${buf.slice(0, bytes).toString()}`);
        resolve(fd);
      });
    });
  }, (err) => {
    console.log(`maybe catch here: ${err}`);
    throw err;
  })
  .then((fd) => {
    console.log(fd);
    return new Promise((resolve, reject) => {
      fs.close(fd, function(err) {
             if (err) {
               err.message = err.message + ' some shiiiiiit';
                console.log(err);
                reject(err);
             }
             console.log("-3. File closed successfully.");
             resolve('Done');
      });
    });
  }, (err) => {
    console.log(`or catch here: ${err}`);
    throw err;
  })
  .then(result => {console.log(result)},
    err => {
      console.log(`last trap: ${err}`)
      throw err;
    })
  .catch(err => {
    console.log(`catched: ${err}`);
    err.message = err.message + ' some shiiiiiit';
    console.log(err.message);
  });
