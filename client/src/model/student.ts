export class Student {
  name: string;
  mobileNumber: number;
  email: string;
  password: string;
  gender: string;
  course: string;
  additionalCourses: string[];
  constructor(
    name: string,
    mobileNumber: number,
    email: string,
    password: string,
    gender: string,
    course: string,
    additionalCourses: string[]
  ) {
    this.name = name;
    this.mobileNumber = mobileNumber;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.course = course;
    this.additionalCourses = additionalCourses;
  }
}

