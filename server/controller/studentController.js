const Student=require("../model/student");

exports.postStudent=async (req,res,next)=>{
    try{
        const studentData = req.body;
        const student=await Student.create(studentData);
        console.log("student created",student);
        res.json({student,registered:true});
    }
    catch(err){
        console.log(err);
        res.json({error,registered:false});
    }
}

exports.putEditStudent=async (req,res,next)=>{
    try{
        const id=req.params.id;
        const data=req.body;
        const student=await Student.findByIdAndUpdate(id,{$set:data},{new:true});
        res.json({student,status:true});
    }
    catch(err)
    {
        console.log(err);
        res.json({err,status:false});
    }
}

exports.deleteStudent=async (req,res,next)=>{
    try{
        const id=req.params.id;
        const student=await Student.findByIdAndDelete(id);
        res.json({student,status:true});
    }
    catch(err){
        console.log(err);
        res.json({err,status:false});
    }
}

exports.getStudents=async (req,res,next)=>{
    try{
        const students=await Student.find({},{password:0});
        res.json({students,status:true});
    }
    catch(err){
        console.log(err);
        res.json({students:null,status:false});
    }
}