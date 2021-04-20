const mongoose = require('mongoose')


const appSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, "Please enter the Project Name!"],
        trim: true
    },
    taskName: {
        type: String,
        required: [true, "Please enter the Task"],
        trim: true
    },
    taskDetails:{
        type: String,
        required: [true, "Please provide the task details"],
        trim: true
    },
    createdBy:{
        type: String,
        required: [true, "Please provide your name!"],
        trim: true
    },
    assignedTo: {
        type: String,
        required: [true, "Please assign someone!"],
        trim: true
    },
    createdDate:{
        type:Date,
        default: Date.now()
    },
    startDate:{
        type:Date,
        required:true,
        default: Date.now()
    },
    expectedEndDate:{
        type:Date,
        required:true,
        default: Date.now()
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("App", appSchema)