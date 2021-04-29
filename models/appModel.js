const mongoose = require('mongoose')


const appSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: [true, "Please enter the Project Name!"],
        trim: true,
        unique:true
    },
    taskDetails: [
        {
            taskId:{type: String,trim: true},
            taskName:{type: String, required: [true, "Please enter the Project Name!"], trim: true},
            taskDetails:{type: String, required: [true, "Please enter the Project Name!"], trim: true},
            taskAssignedTo:{type: String, required: [true, "Please enter the Project Name!"], trim: true},
            taskCreatedDate:{type:Date,default: Date.now()},
            taskStartDate:{type:Date,required:true,default: Date.now()},
            taskExpectedEndDate:{type:Date, required:true,default: Date.now()},
        }, 
    ],
    history:[
        {
            activity:{type: String, required: true, trim: true},
            comment:{type: String, trim: true},
            updatedOn:{type:Date,default: Date.now()}
        }
    ],
    assignedMembers:[],
    projectCreatedBy:{
        type: String,
        required: [true, "Please provide your name!"],
        trim: true
    },
    projectCreatedDate:{
        type:Date,
        default: Date.now()
    },
    projectStartDate:{
        type:Date,
        required:true,
        default: Date.now()
    },
    projectExpectedEndDate:{
        type:Date,
        required:true,
        default: Date.now()
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("App", appSchema)