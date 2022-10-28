import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';
import { EmployeeDetails } from '../EmployeeDetails.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})

export class EmployeeFormComponent implements OnInit {
  employeeForm! :FormGroup;
  birthDate!:Date;
  age!:number;
  id!:number;
  error: string = "";
  updateActive:boolean=false;
  Employees:EmployeeDetails[]=[];
  // employee!:EmployeeDetails;


  constructor(private employeeService:EmployeeServiceService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.employeeForm = new FormGroup({

      'FirstName': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$') ] ),

      'LastName': new FormControl(null, [Validators.required ,Validators.pattern('^[a-zA-Z ]*$')] ),

      'Email': new FormControl(null, [Validators.required, Validators.email]),

      // 'DateOfBirth': new FormControl(null, [Validators.required]),

      'City': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),

      'Country': new FormControl(null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),

      'Address': new FormControl(null, [Validators.required]),

      'MobileNumber': new FormControl(null, [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      'Gender': new FormControl('', Validators.required)
      // 'Age': new FormControl(null),

    })
  }
  getEmployees(){
    this.employeeService.getEmployees().subscribe(
      (data:any)=>{
          if(data != null){
            this.Employees = data; 
            console.log(data);
            console.log(this.Employees)
          }else{
            console.log("Somthing went wrong")
          }
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    )
  }


  onSubmit(form:FormGroup){
    
     console.log(form.value.FirstName);
     const data = {
     firstName :form.value.FirstName,
      lastName :form.value.LastName,
      dateOfBirth :this.birthDate,
      age:this.age,
       gender :form.value.Gender=="male"?0:1,
      city:form.value.City ,
      country :form.value.Country,
      address:form.value.Address,
      mobileNumber:form.value.MobileNumber, 
      email :form.value.Email,
     }
     
      console.log(data);
      this.employeeService.saveEmployee(data).subscribe(
        (data:any)=>{
            if(data != null){
              console.log(data);
            }else{
              console.log("Somthing went wrong")
            }
        },
        (errorMessage) => {
          this.error = errorMessage;
        }
      )
      this.getEmployees();
  }
  calculateAge(){
    var today = new Date();
    var birthDate = this.birthDate;
    this.age = today.getFullYear() - birthDate.getFullYear();
    console.log(this.age);
  }
  updateEmployeee(form:FormGroup){
    console.log(form.value.FirstName);
     const data = {
      firstName :form.value.FirstName,
      lastName :form.value.LastName,
      dateOfBirth :this.birthDate,
      age:this.age,
      gender :form.value.Gender=="male"?0:1,
      city:form.value.City ,
      country :form.value.Country,
      address:form.value.Address,
      mobileNumber:form.value.MobileNumber, 
      email :form.value.Email,
     }
     
      console.log(data);
      this.employeeService.updateEmployee(this.id,data).subscribe(
        (data:any)=>{
            console.log(data);
        },
        (errorMessage) => {
          this.error = errorMessage;
        }
      )
      this.getEmployees();
  }
  deleteEmployeee(){
    this.employeeService.deleteEmployee(this.id).subscribe(
      (data:any)=>{
          console.log(data);
      },
      (errorMessage) => {
        this.error = errorMessage;
      }
    )
    this.getEmployees();
  }
  clearForm(){
    this.employeeForm.reset();
    this.id!=null;
    this.birthDate=new Date();
    this.age=0;
    this.updateActive=false;
  }

  onSelect(form:FormGroup,employee:EmployeeDetails){
    const data = {
      FirstName :employee.firstName,
       LastName :employee.lastName,
        Gender :employee.gender==0?"male":"female",
       City:employee.city ,
       Country :employee.country,
       Address:employee.address,
       MobileNumber:employee.mobileNumber, 
       Email :employee.email,
      }
      this.birthDate=employee.dateOfBirth;
      this.age=employee.age;
      this.id=employee.id;
      this.employeeForm.setValue(data);
      this.updateActive=true;
  }
}
