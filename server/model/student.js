const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const studentSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        require:true
    },
    course:{
        type:String,
        required:true
    },
    additionalCourses:[{
        value:{
            type:String
        },
        isSelected:{
            type:Boolean
        }
    }]
},{timestamps:true});

const studentModel=mongoose.model("students",studentSchema);

module.exports = studentModel;