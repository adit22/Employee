const mongoose = require("mongoose")

const employeeschema=new mongoose.Schema({
name:String,
email:String,
phone:String,
picture:String,
salary:String,
position:String

})


mongoose.model("emplo",employeeschema)