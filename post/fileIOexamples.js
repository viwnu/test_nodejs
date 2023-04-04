var fs = require("fs");
// Asynchronous - Opening File
console.log("Going to open file!");
fs.open('input.txt', 'r+', function(err, fd) { // 'a+': Open file for reading and appending. The file is created if it does not exist.
   if (err) {
     if(err.errno == -4058) {
       console.log("we Dont have a fucking file!");
     }
    return console.error(err);
   }
   console.log("File opened successfully!");
});

// Считывание свойств файла
fs.stat('input.txt', function(err, stat) {
  if(err) {
    if(err.errno == -4058) {
      console.log("we Dont have a fucking file to show his fucking stats!");
    }
   return console.error(err);
  }
  console.log(stat);
});

// Проверка наличия файла
const exists = fs.existsSync('input.txt');
console.log('Exists: ', exists);

// Код для чтения файла c n-ного байта
var buf = new Buffer.alloc(1024);

console.log("Going to open an existing file");
fs.open('input.txt', 'r+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
   console.log("File opened successfully!");
   console.log("Going to read the file");

   fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
      if (err){
         console.log(err);
      }
      console.log(bytes + " bytes read");

      // Print only read bytes to avoid junk.
      if(bytes > 0){
         console.log(buf.slice(0, bytes).toString());
      }
   });
});
