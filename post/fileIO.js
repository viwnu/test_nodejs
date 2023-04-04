const fs = require("fs");
const buf = new Buffer.alloc(16);

//Запись строки в открытый файл
// fs.write(fd, string[, position[, encoding]], callback)
let postWrite = async function(dataFile, data) {
  let isDone = false;

  let openPromise = new Promise((resolve, reject) => {
    fs.open(dataFile, 'a+', (err, fd) => {
      if (err) {
        reject(err);
      } else {
        console.log(`-1. File opened: ${fd}`);
        resolve(fd);
      };
    });
  });
  
  let fd = await openPromise;
  await fs.read(fd, buf, 0, buf.length, 44, function(err, bytes) {
      if (err){
         console.log(err);
         reject(err);
      }
      console.log(`-2. position in fs.read is: ${44}`);
      console.log(`-2.1. the something from the file:\n${buf.slice(0, bytes).toString()}`);
  });
  let result = await fs.close(fd, function(err) {
         if (err) {
            console.log(err);
            reject(err);
         }
         console.log("-3. File closed successfully.");
         return "Done";
  });
  return result;
  //
  // fs.open(dataFile, 'a+', function(err, fd) {
  //   if (err) {
  //      return console.error(err);
  //   }
  //   let position = 0;
  //   fs.stat(dataFile, function(err, stat) {
  //     if(err) {
  //      return console.error(err);
  //     }
  //     console.log(`It is a size before: ${stat.size}`);
  //     position = stat.size - buf.length < 0? 0: stat.size - buf.length;
  //     console.log(`It is a position: ${position}`);
  //   });
  //   console.log(`position from out of function: ${position}`);
  //   fs.read(fd, buf, 0, buf.length, 44, function(err, bytes) {
  //     if (err){
  //        console.log(err);
  //     }
  //     console.log(`position in fs.read is: ${position}`);
  //     console.log(buf.slice(0, bytes).toString());
  //   });
  //   fs.write(fd, data + "\n", (err, bytes)=>{
  //     if(err){
  //       console.log(err.message);
  //     }else{
  //       console.log(bytes +' bytes written');
  //     }
  //   });
  //   fs.close(fd, function(err) {
  //        if (err) {
  //           console.log(err);
  //        }
  //        console.log("File closed successfully.");
  //     });
  // });
  // //1. read last n lines
  //2. write new data(after create id)
  //3. read last data
  //4. check id before and after writing
};

postWrite('test.txt', 'beatch').
  then((result) => {
    console.log(`-4. this must be before number 5: ${result}`);
  });
console.log(`-5. this must be after all`);
