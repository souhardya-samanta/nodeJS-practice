const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    description: {
        type : String,
        required: true,
        trim: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,

    }
})
const Task = mongoose.model('tasks',TaskSchema)
module.exports = Task;