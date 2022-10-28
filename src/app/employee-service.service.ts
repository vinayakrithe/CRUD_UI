import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, throwError } from "rxjs";
import {EmployeeDetails} from './EmployeeDetails.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(private Http:HttpClient) { }
  apiurl='https://localhost:44379/api/Employees/';
   getEmployees(){
    return this.Http.get(this.apiurl).pipe(
      catchError(this.handleError));
  }
  saveEmployee(emp:any){
    return this.Http.post(this.apiurl,emp).pipe(
      catchError(this.handleError));
  }
  updateEmployee(id:number,emp:any){
    return this.Http.put(this.apiurl+id,emp).pipe(
      catchError(this.handleError));
  }
  deleteEmployee(id:number){
    return this.Http.delete(this.apiurl+id).pipe(
      catchError(this.handleError));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An unknown error occured";
    if(errorRes.error.message){
        return throwError(()=>errorRes.error.message);
    }
    // else {
    //     return throwError(()=>errorMessage);
    // }
    return throwError(()=>errorMessage);
}


}
