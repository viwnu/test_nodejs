const fs = require("fs/promises");
// import {open, close} from "fs/promises";
// import { promises as fsPromises } from 'fs';

const buf = new Buffer.alloc(1024);

let fileIO = async function(dataFile, data=null) {
  let file;
  try {

    file = await fs.open(dataFile, 'a+');
    // throw new Error(`I am the ERROR`);
    console.log(`file opened`);

    let stat = await file.stat();
    console.log(`stat size is: ` + stat.size);

    let position = stat.size - buf.length <= 0? 0: stat.size - buf.length;
    let readed = await file.read(buf, 0, buf.length, position);
    console.log(`readed bytes = ` + readed.bytesRead);
    const strings = buf.slice(0, readed.bytesRead).toString().split('\n')
    const preparedStrings = strings.filter(string => {
      return (Boolean(string) && string != "\n")
    }).reverse()

    const writeStringNumber = stat.size == 0? 0: preparedStrings[0]?.split('.')[0]*1 + 1

    if(data != null) {
      let written = await file.write(writeStringNumber + '. ' + data + '\n');
      console.log(`bytes writen: ` + written.bytesWritten);
    }

  } catch(err) {
    console.log(`catched: ` + err);
    // return err;
  } finally {
    await file?.close();
    return 'closed, job done';
  };
};

const readMessages = (filePath) => fileIO(filePath)
const writeMessage = (filePath, data) => fileIO(filePath, data)

writeMessage('test.txt', 'sisters and brothers').then(res=>{console.log(res)})
readMessages('test.txt').then(res=>{console.log(res)})

//1. вынести чтение и запись в отдельные функции(которые что-то возвращают)
//2. функции для внешнего использования readMessages и writeMessage должны возвращать n последних строк

// может переписать код с использованием отдельного файлика с указанием позиции каждого сообщения,
// тогда дописывание будет работать без необходимости предварительного считывания всего файла, а только его последней строчки для перепроверки нумерации строк
// а для чтения из файла можно будет указать конкретный диапазон и в последствии использовать для разбиения загрузки на бандлы