require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('603d0d4028ded28dd76ded4d',{
    isCompleted: true
}).then((task)=>{
    console.log(task)
    return Task.countDocuments({isCompleted: false}).then((result)=>{
        console.log(result)
    })
}).catch((e)=>{
    console.log(e)
})