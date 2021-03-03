require('../src/db/mongoose')
const { count } = require('../src/models/task')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('603d0d4028ded28dd76ded4d',{
//     isCompleted: true
// }).then((task)=>{
//     console.log(task)
//     return Task.countDocuments({isCompleted: false}).then((result)=>{
//         console.log(result)
//     })
// }).catch((e)=>{
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
const task = await Task.findByIdAndDelete(id)
const count = await Task.countDocuments({
    isCompleted: false
})
return count
}

deleteTaskAndCount('603e3e8931671b14ce476de6').then((count)=>{
    console.log('No. of incomplete task ',count)
}).catch((e)=>{
    console.log(e)
})