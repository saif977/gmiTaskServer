import { HttpClient } from '@angular/common/http';
import { Student } from 'src/model/student';
import { Injectable } from '@angular/core';
import { StudentWithId } from 'src/model/studentWithId';

@Injectable({ providedIn: 'root' })
export class StudentService {
  students: StudentWithId[] = [];

  isEditStudent: boolean = false;
  editStudentId:string = "";
  dbUrl: string = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  // addStudent=(student:any)=>{
  //   // console.log(student,this.students,this.st);
  //    this.students.push(student);
  //    console.log(this.students);
  //  }

  //  deleteStudent=(id:Number)=>{
  //   this.students=this.students.filter((stud)=>+stud.id!==+id)
  //   console.log(this.students);
  // }

  // getStudent=(id:number)=>this.students.find((stud)=>+stud.id===+id)

  //==========call to rest api==========

  postStudent = (data: Student) => {
    console.log(data);
    this.http.post(`${this.dbUrl}/register`, data).subscribe(
      (res) => {
        console.log(res);
        this.getStudents();
      },
      (err) => console.log(err)
    );
  };

  getStudents = () => {
    this.http
      .get<{ status: boolean; students: StudentWithId[] }>(
        `${this.dbUrl}/get-students`
      )
      .subscribe(
        (res) => {
          console.log('students', res.students);
          this.students = res.students;
        },
        (err) => console.log(err)
      );
  };

  editStudent=(id:string,data:Student)=>{
    this.http.put(`${this.dbUrl}/edit/${this.editStudentId}`,data).subscribe(res=>{
      console.log(res);
      this.getStudents();
    },err=>console.log(err));
  }

  deleteStudent = (id: string) => {
    this.http.delete(`${this.dbUrl}/delete/${id}`).subscribe(
      (res) => {
        console.log(res);
        this.getStudents();
      },
      (err) => console.log(err)
    );
  };
}
