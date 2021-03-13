const express = require('express');
require('./db/mongoose');
const UserRouter = require("./routers/user");
const TaskRouter = require("./routers/task");
const jwt = require("jsonwebtoken");

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(UserRouter)
app.use(TaskRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

// const myFunction = async()=>{
// const token = await jwt.sign({_id:"12345678"},"SdDHBOTPkwH5QhLg",{expiresIn: '5 seconds'})
// console.log(token)

// const data=jwt.verify(token,"SdDHBOTPkwH5QhLg")
// console.log('Data',data)
// }

// myFunction()