import { Component, OnInit,Input, DoCheck } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit,DoCheck {
  studs:{}[]=[];
  constructor(private studentService:StudentService) {
    this.studs=this.studentService.students;
   }

  ngOnInit(): void {
    console.log(this.studs,"studs")
  }

  ngDoCheck(){
    this.studs=this.studentService.students;
  }

}
