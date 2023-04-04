const fs = require("fs");

let dataFile = 'test.txt';
const buf = new Buffer.alloc(16);

let fileIO = async function(dataFile, data) {
  try {

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

    let readPromise = fd => {
      console.log(`fd in read: ` + fd);
      return new Promise((resolve, reject) => {
        console.log(fd);
        fs.read(fd, buf, 0, buf.length, 44, function(err, bytes) {
          // err = new Error(`I am ERROR too`);
          if (err){
            err.message = err.message + ' some shiiiiiit';
             console.log(`whle reading: ` + err);
             console.log(err.name);
             reject(err);
          } else {
            console.log(`-2. position in fs.read is: ${44}`);
            console.log(`-2.1. the something from the file:\n${buf.slice(0, bytes).toString()}`);
            resolve(fd);
          }
        });
      });
    };

    let closePromise = fd => {
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
    };

    let fd = await openPromise;
    console.log(fd);
    let read = await readPromise(fd);
    console.log(`after read: ` + read);
    let close = await closePromise(fd);
    console.log(`after close: ` + close);

    return close;

  } catch(err) {
    console.log(`catched: ` + err);
    return err;
  }
};

fileIO('test.txt', 'beatch').then(res=>{console.log(`finally return: ` + res)});
