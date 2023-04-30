const fs = require("fs/promises");
// import {open, close} from "fs/promises";
// import { promises as fsPromises } from 'fs';

const buf = new Buffer.alloc(1024);

const readData = async (file, indexses, startIndex, endIndex) => {
  try {
    const start = startIndex < 0? -1: startIndex
    const buf = new Buffer.alloc(1024)
    const dataStrings = []
    for (let i = endIndex; i > start; i--) {
      const length = (i == 0)? indexses[i]: indexses[i] - indexses[i-1]
      const bites =  await file.read(buf, 0, length, indexses[i-1]? indexses[i-1]: 0)
      const dataString = buf.slice(0, bites.bytesRead).toString().slice(0, -1)
      dataObj = {
        number: dataString?.split('. ')[0]*1,
        string: dataString?.split('. ')[1]
      }
      dataStrings.push(dataObj)
    }
    return (dataStrings)
  } catch(err) {
    console.log('Err in function readData: ' + err);
  } 
}

const deleteData = async (file, indexses, startIndex, endIndex) => {
  try {
    const start = startIndex < 0? -1: startIndex
    deletePromises = []
    for (let i = endIndex; i > start; i--) {
      const length = (i == 0)? indexses[i]: indexses[i] - indexses[i-1]
      const buf = new Buffer.alloc(length)
      console.log('buffer is:')
      console.log(buf);
      const deletePromise = await file.write(buf, 0, length, 0)
      deletePromises.push(deletePromise)
    }
    return (deletePromises)
  } catch(err) {
    console.log('Err in function delete: ' + err);
  } 
}

const readIndex = async (indexFile) => {
  try {
    let readedIndexes = await indexFile.read(buf, 0, buf.length, 0)
    return(buf.slice(0, readedIndexes.bytesRead).toString().split(',\n').slice(0,-1).map(item => item*1))
  }catch(err) {
    console.log('Err in function readIndex: ' + err);
  }
}

let fileIO = async function(dataFile, Nread=[1,1], deleteString=false, data=null) {
  let file;
  try {

    file = await fs.open(dataFile, 'a+');
    
    const indexFile = dataFile.split('.')[0] + 'Index.txt'
    fileIndex = await fs.open(indexFile, 'a+')

    // throw new Error(`I am the ERROR`);

    let stat = await file.stat();

    const indexses = await readIndex(fileIndex)
    
    const readedStrings = await readData(file, indexses, indexses.length-1-Nread[0], indexses.length-1)

    if(deleteString) {
      deleteData(file, indexses, Nread[1] - Nread[0], Nread[1])
    }
        
    if(data != null) {
      const writeStringNumber = stat.size == 0? 0: readedStrings[0].number + 1
      let written = await file.write(writeStringNumber + '. ' + data + '\n')
      await fileIndex.write(JSON.stringify(stat.size + written.bytesWritten) + ',\n')
      const indexses = await readIndex(fileIndex)
      return(await readData(file, indexses, indexses.length-1-Nread[0], indexses.length-1))
    } else {
      return (readedStrings)
    }
    
  } catch(err) {
    console.log(`catched: ` + err);
    // return err;
  } finally {
    await file?.close();
    await fileIndex?.close();
  };
};

module.exports.readBundle = async (n) => fileIO('post/post.txt', [n, 1])
module.exports.writeBundle = async (data) => fileIO('post/post.txt', [1,1], false, data)
// module.exports.deleteBundle = async (n, start) => fileIO('post/post.txt', [n, start])
// deleteBundle = async (n, start) => fileIO('post/post.txt', [n, start], true)

// deleteBundle(1, 2).then((res) => console.log(res))
// export {readBundle, writeBundle}

//1. вынести чтение и запись в отдельные функции(которые что-то возвращают)
//2. функции для внешнего использования readMessages и writeMessage должны возвращать n последних строк

// может переписать код с использованием отдельного файлика с указанием позиции каждого сообщения,
// тогда дописывание будет работать без необходимости предварительного считывания всего файла, а только его последней строчки для перепроверки нумерации строк
// а для чтения из файла можно будет указать конкретный диапазон и в последствии использовать для разбиения загрузки на бандлы

// если надо делать удаление то удалять только содержимое строки(но тогда место на диске будет занято пустотой)
// или же в таком случае все строки после удаляемой
// идея сделать файл ограничивыемым по размеру и продолжать запись в другой файл при большом количестве строк
// можно делать специальную пометку в индексе

// файл индекса нужно научиться сжимать если это возможно

// нужно допилить внешний интерфейс функция записи и удаления строк или возможно обьектов или дркгих типов данных

// Если при работе с файлом вы меняете длину файла (уменьшаете) или смещаете его содержимое, то ничего другого,
//  кроме как перезаписать файл, не остаётся (это связано с тем, каким образом файлы хранятся физически на самом диске).
//  Обычно это делается следующим образом: открывается исходный файл, параллельно создается новый файл с припиской к имени,
//  допустим, file.txt и file.new.txt. В вашем случае содержимое из file.txt считывается построчно, и, если строка остается в файле,
//  то сразу записывается в file.new.txt. Таким образом, вы избегаете создание массива для хранения всего содержимого файла.
//  После того, как весь файл был прочитан, file.txt удаляется (DeleteFile), а file.new.txt переименовывается (RenameFile) в file.txt.
//  Так работает большинство программ, включая Microsoft Office и многие другие.
