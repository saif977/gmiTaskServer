import { Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { StudentWithId } from 'src/model/studentWithId';
import { gender } from '../../assets/data';
import { additionalCourses } from '../../assets/data';
import {Student} from "../../model/student"
import {StudentService} from "../services/student.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})

export class FormComponent implements OnInit {
  gender = gender;
  additionalCourses:any = additionalCourses.map((c) =>
    JSON.parse(JSON.stringify(c))
  );

  studs:{}[]=[];

  registerForm:any;

  constructor(private studentService: StudentService) {

  }
  
  ngOnInit(): void {
    
        this.registerForm=new FormGroup({
          "studentName":new FormControl(null,[Validators.required]),
          "studentMobileNumber":new FormControl(null,[Validators.required,this.minLengthValidator]),
          "studentEmail":new FormControl(null,[Validators.required,Validators.email]),
          "studentPassword":new FormControl(null,[Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
          "studentGender":new FormControl("male",[Validators.required]),
          "studentCourse":new FormControl(null,[Validators.required])
        })
    console.log(gender)
    this.studs=this.studentService.students;
    this.studentService.getStudents();
  }

  ngDoCheck(){
    console.log(this.studentService.isEditStudent);
    console.log(this.studentService.editStudentId);
    if(this.studentService.isEditStudent&&this.studentService.editStudentId!=="")
    {
      const student=this.studentService.students.find((stud:StudentWithId)=>stud._id===this.studentService.editStudentId);
      console.log(this.registerForm);
      console.log(student);
      this.registerForm.patchValue({
          "studentName":student?.name,
          "studentMobileNumber":student?.mobileNumber,
          "studentEmail":student?.email,
          "studentPassword":student?.password,
          "studentGender":student?.gender,
          "studentCourse":student?.course
      });

      this.additionalCourses=student?.additionalCourses;
      // console.log("Ad",this.additionalCourses)

      this.studentService.isEditStudent=false;

    }
  }


  getAdditionalCourses(){
    const adtnCrse:any=[];
    this.additionalCourses.forEach((c:any)=>{
      adtnCrse.push({...c});
    })
    return adtnCrse;
  }

  
  // editStudent=(id:number,stud:any,adtnCrses:any)=>{
  //   console.log(id,stud);
  //   const newStudent=new Student(id,stud.studentName,stud.studentMobileNumber,stud.studentEmail,stud.studentPassword,stud.studentGender,stud.studentCourse,adtnCrses);
  //   this.studentService.students[id-1]=newStudent;
  // }


  onSubmit() {
    const stud=this.registerForm.value;
    const adtnCrses=this.getAdditionalCourses();
    // const newId=this.studs.length+1;
    // if(this.studentService.editStudentId>=0)
    // {
    //   this.editStudent(this.studentService.editStudentId,stud,adtnCrses);
    // }
    // else{
    //   const newStudent=new Student(newId,stud.studentName,stud.studentMobileNumber,stud.studentEmail,stud.studentPassword,stud.studentGender,stud.studentCourse,adtnCrses);
    //    console.log(newStudent)
    //    this.studentService.addStudent(newStudent);
    // }
    // this.studentService.editStudentId=-1;
    // this.registerForm.reset();


    // ============rest api=========

    const newStudent=new Student(stud.studentName,stud.studentMobileNumber,stud.studentEmail,stud.studentPassword,stud.studentGender,stud.studentCourse,adtnCrses);
    if(this.studentService.editStudentId==="")
    this.studentService.postStudent(newStudent);
    else
    this.studentService.editStudent(this.studentService.editStudentId,newStudent);
    this.studentService.editStudentId="";
    this.registerForm.reset();
  }

  onChange(value: string) {
    this.additionalCourses.forEach((c:any) => {
      if (c.value === value) c.isSelected = !c.isSelected;
    });
    console.log(this.additionalCourses);
  }

  giveBackgroundColor(property:string){
    // const e=this.registerForm.get(property);
    // if(!e.touched)
    // return "";
    // return e.touched&&e.invalid?"#ff000063":"#52ec5285";
  }

  giveBorder(e:NgModel){
    if(!e.touched)
    return "";
    return e.touched&&e.invalid?"1px solid red":"1px solid green";
  }

  minLengthValidator(control:FormControl):{[s:string] : boolean}|null{
    const val=control.value;
    if(val&&val.toString().length<10)
    return {"minLength":true};
    return null;
  }
}
