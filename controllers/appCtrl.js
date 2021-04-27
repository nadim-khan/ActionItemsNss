const App = require('../models/appModel')
const sendMail = require('./sendTaskMail')

const {CLIENT_URL} = process.env

const appCtrl = {
    register: async (req, res) => {
        try {
            const {
                projectName,
                projectCreatedBy,
                projectCreatedDate,
                projectStartDate,
                projectExpectedEndDate,
                taskDetails
            } = req.body
            let history = [];
            history.push(
                {
                    activity:`Project <strong>${projectName}</strong> Initialized`,
                    updatedOn: new Date()
                },{
                    activity:`<strong>${projectCreatedBy}</strong> has added <strong> ${taskDetails.length} ${taskDetails.length < 2 ? 'task' : 'tasks'} </strong>`,
                    updatedOn: new Date()
                }
            )
            console.log('1',history)
            
            if(!projectName|| !projectCreatedBy)
                return res.status(400).json({msg: "Please fill in all fields."})

            if(taskDetails.length == 0)
                return res.status(400).json({msg: "Please add atlease one task along with the project"})


            const savedApp = await new App(
                {
                    projectName,
                    history,
                    taskDetails,
                    projectCreatedBy,
                    projectCreatedDate,
                    projectStartDate,
                    projectExpectedEndDate
                }).save()

            if(savedApp) return res.status(200).json({msg: "App Registered"})
            

            const details = {
                projectName:projectName,
                taskDetails:taskDetails,
                history:history,
                projectCreatedBy:projectCreatedBy,
                projectCreatedDate:projectCreatedDate,
                projectStartDate:projectStartDate,
                projectExpectedEndDate:projectExpectedEndDate
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