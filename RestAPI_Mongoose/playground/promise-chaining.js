require('../src/db/mongoose')
const User = require('../src/models/user')

User.findByIdAndUpdate('603cb3323e96187f93eb8218',{
    age: 1
}).then((user)=>{
    console.log(user)
    return User.countDocuments({age: 1}).then((result)=>{
        console.log(result)
    })
}).catch((e)=>{
    console.log(e)
})
//603ccb4f2ca737b0206f5fe7