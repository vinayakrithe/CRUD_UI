export class EmployeeDetails{
         public id :number;
         public firstName :string;
         public lastName :string;
         public dateOfBirth :Date;
         public  age:number;
         public  gender :number;
         public city :string;
         public country :string;
         public address :string;
         public mobileNumber :string;
         public email :string;
         constructor(Id :number,
             FirstName :string,
             LastName :string,
             DateOfBirth :Date,
              Age:number,
              Gender :number,
             City :string,
             Country :string,
             Address :string,
             MobileNumber :string,
             Email :string){
                 this.id=Id
                this.firstName =FirstName,
                this.lastName =LastName,
                this.dateOfBirth =DateOfBirth,
                this.age=Age,
                this. gender =Gender,
                this.city=City ,
                this.country =Country,
                this.address=Address,
                this. mobileNumber=MobileNumber ,
                this.email =Email
         }
}