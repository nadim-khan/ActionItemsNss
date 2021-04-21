const App = require('../models/appModel')
const sendMail = require('./sendTaskMail')

const {CLIENT_URL} = process.env

const appCtrl = {
    register: async (req, res) => {
        try {
            const {projectName, taskName, taskDetails,createdBy,assignedTo,createdDate,startDate,expectedEndDate} = req.body
            
            if(!projectName || !taskName || !taskDetails || !createdBy || !assignedTo)
                return res.status(400).json({msg: "Please fill in all fields."})

            const savedApp = await new App({projectName, taskName, taskDetails,createdBy,assignedTo,createdDate,startDate,expectedEndDate}).save()
            if(savedApp) return res.status(200).json({msg: "App Registered"})

            const details = {
                projectName:projectName,
                taskName:taskName, 
                taskDetails:taskDetails,
                createdBy:createdBy,
                startDate:startDate,
                expectedEndDate:expectedEndDate
            };
            sendMail(assignedTo, details, "Verify your email address")


            res.json({msg: "Register Success! Please activate your email to start."})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAllApps: async (req, res) => {
        try {
            const allApps = await App.find();
            if(allApps) return res.status(200).json(allApps)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
    
}


module.exports = appCtrl