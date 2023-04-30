// it is a some experimantation

const {defrag, readBundle, writeBundle, deleteBundle} = require('fsOnClass.js')
const Emitter = require("events");

const TimeoutPromise = async (fun, delay) => {0
    return new Promise((res, rej) => {
      try {
        setTimeout(() => {
            res(fun())
          }, delay)
      } catch (error) {console.error('in timeout promise', error)}
    })
}

let taskList = []
const AddTask = async (fun) => {
    taskList.push({fun})
    return await taskList[0].res
}

let keepSpin = false
const stop = () => {
    keepSpin = false
    console.log('stopped');
}

const TaskDemon = async () => {
    while(keepSpin) {
        if(taskList.length != 0) {
            taskList[0].res = await taskList[0].fun()
            taskList.shift()
        }
        await TimeoutPromise(() => console.log('keep spining'), 100)
    }
}

const start = () => {
    keepSpin = true
    TaskDemon()
}



let iterator = 0

const increment = async (delay) => {
    const res = await AddTask(async () => await TimeoutPromise(() => iterator++, delay))
    console.log('res', res);
    return res
}

start()
increment(100).then((res) => console.log(res))
increment(5000).then((res) => console.log(res))
increment(1000).then((res) => console.log(res))
increment(100).then((res) => console.log(res))
AddTask(async () => await TimeoutPromise(stop, 3000))






// module.exports.readBundle = async () => {
//     AddTask(async () => await readBundle(10))
//     return await taskList[0].res
// }

// module.exports.writeBundle = async (data) => {return(AddTask(() => readBundle(10)))}


// module.exports.writeBundle = async (data) => {return(await fileClassHadle('writeData', data))}
// module.exports.deleteBundle = async (srtIndex) => {return(await fileClassHadle('deleteData', srtIndex))}