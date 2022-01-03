import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import {EmployeeModel} from './employee-dashboard.module';
import {ApiService} from '../shared/api.service';


@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],

})
export class EmployeeDashboardComponent implements OnInit {

formValue !: FormGroup;
employeeModleObj : EmployeeModel = new EmployeeModel();
employeeData !: any;
showAdd !: boolean;
showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
  	this.formValue = this.formbuilder.group({
  		firstName : [''],
  		lastName : [''],
  		email : [''],
  		mobile : [''], 
  		salary : ['']
  	})

    this.getAllEmployee();
  }

  postEmployeeDetails(){
    this.employeeModleObj.firstName = this.formValue.value.firstName;
    this.employeeModleObj.lastName = this.formValue.value.lastName;
    this.employeeModleObj.email = this.formValue.value.email;
    this.employeeModleObj.mobile = this.formValue.value.mobile;
    this.employeeModleObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeeModleObj).subscribe(res=>{
      console.log(res);
      alert("Employee added succesfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    err=>{
      alert("Something Went wrong");
    })
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe(res=>{
      this.employeeData = res;
    })
  }

  clickAddEmploy(){
    this.formValue.reset();
    this.showAdd =true;
    this.showUpdate = false;
  }

  deleteEmployee(row: any){
    this.api.deleteEmployee(row.id).subscribe(res=>{
      alert("Employee Deleted")
      this.getAllEmployee();
      
    })
  }

 onEdit(row: any){
   this.showAdd = false;
   this.showUpdate = true;
   this.employeeModleObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
 }

 updateEmployeeDetails(){
    this.employeeModleObj.firstName = this.formValue.value.firstName;
    this.employeeModleObj.lastName = this.formValue.value.lastName;
    this.employeeModleObj.email = this.formValue.value.email;
    this.employeeModleObj.mobile = this.formValue.value.mobile;
    this.employeeModleObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModleObj,this.employeeModleObj.id).subscribe(res=>{
      alert("updated succesfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })

 
 }
}
