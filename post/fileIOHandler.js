const fs = require("fs/promises")
const Emitter = require("events")

const {fileIO} = require('./fsOnClass.js')


let emitter = new Emitter()
let eventName = "file_released"

let fileBusy = false
const waitingFileRelease = async () => {
    if(!fileBusy) return true
    return new Promise((res, rej) => {
        emitter.on(eventName, () => res(true))
    })
}

const Defrag = async (fileName) => {
    const file = new fileIO(fileName)
        
    const defragFilePath = file.dataFile.split('/')[0] + '/defrag.txt'
    const defragFile = new fileIO(defragFilePath)
    
    try {
        
        const fileStat = await fs.stat(file.dataFile)
        if(fileStat.size == 0) {
            return ('nothing to be deffraged')
        }

        await file.openFile()
        await defragFile.openFile()

        const chankSize = 10
        
        let positionsToread = []
        for (let i = file.indexses.length-1; i >=0; i -=chankSize) {
            positionsToread.push(i)
        }

        if(positionsToread.length == 0) {
            return ('nothing to be deffraged')
        }
        positionsToread.reverse()

        for (const position of positionsToread) {
            const readedData = await file.readData(chankSize, position)
            readedData.reverse()

            for (const data of readedData) {
                try {
                    await defragFile.writeData(data.dataStr, data.strIndex)
                } catch (error) {console.error(error)}
            }
        }
        
        await file.file?.close()
        await defragFile.file?.close()
        
        await fs.unlink(file.dataFile)
        await fs.unlink(file.indexFile)
        await fs.rename(defragFile.dataFile, file.dataFile)
        await fs.rename(defragFile.indexFile, file.indexFile)

        return ('defrag file is complete')
    } catch (error) {
        console.error('in Defrag: ' + error)
        await fs.unlink(defragFile.dataFile)
        await fs.unlink(defragFile.indexFile)
    } finally {
        await file.file?.close()
        await defragFile.file?.close()
    }
}

let intervalId = null // создается при первом запросе на сервер, потом остается тем же

const DefragInterval = () => {
    if(intervalId == null) {
        console.log('yeik')//все что внутри выполняется только при первом обращении к файлу
        intervalId = setInterval(async () => {
            try {
                const waitingResult = await waitingFileRelease()
                fileBusy = waitingResult
                const defragRes = await Defrag('post/post.txt')
                console.log(defragRes)
                return
            } catch(err) {console.error('in interval err', err)}
            finally {
                fileBusy = false
                emitter.emit(eventName)
            }
        }, 10000)
    }
}



const fileClassHadle = async (callbackFun, passedArg) => {
    const file = new fileIO('post/post.txt')
    try {
        
        DefragInterval()

        const waitingResult = await waitingFileRelease()
        fileBusy = waitingResult
        
        await file.openFile()
        const fun = file[callbackFun]
        const res = await fun(passedArg)
        
        return (res)
    } catch (error) {
        console.error(error)
    } finally {
        await file.file?.close()
        fileBusy = false
        emitter.emit(eventName)
    }
}

module.exports.readBundle = async () => {return(await fileClassHadle('readData', 10))}
module.exports.writeBundle = async (data) => {return(await fileClassHadle('writeData', data))}
module.exports.deleteBundle = async (srtIndex) => {return(await fileClassHadle('deleteData', srtIndex))}


