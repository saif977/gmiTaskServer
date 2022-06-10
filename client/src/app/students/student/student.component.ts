import { Component, Input, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  @Input() student:any;
  @Input() del:any;
  obj={cl:3}
  constructor(private studentService:StudentService) { }

  ngOnInit(): void {
  }

  onClick(v:any){
    console.log(v);
  }

  getId=(e:any)=>e.target.closest(".studentContainer").getAttribute("id");

  // edit(e:any){
  //   const id=parseInt(this.getId(e));
  //   console.log(id)
  //   this.studentService.isEditStudent=true;
  //   this.studentService.editStudentId=id;
  // }

  // delete(e:any){
  //   const id=parseInt(this.getId(e));
  //   console.log(id);
  //   this.studentService.deleteStudent(id);
  // }

  //======= rest api============

  edit(e:any){
    const id=this.getId(e);
    console.log(id)
    this.studentService.isEditStudent=true;
    this.studentService.editStudentId=id;
  }

  delete(e:any){
    const id=this.getId(e);
    this.studentService.deleteStudent(id);
  }

}
 