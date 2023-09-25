
const mongoose = require("mongoose")

const EmployeSchema = mongoose.Schema({


    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    department: {
        type: String,
        required: true,
    },
    salary: { type: Number, required: true },

})

const EmployModel = mongoose.model("Employe", EmployeSchema)
module.exports = { EmployModel } 