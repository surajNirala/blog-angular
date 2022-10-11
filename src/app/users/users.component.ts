import { User } from './../helpers/user.interface';
import { UserService } from './../helpers/user.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DBOperation } from '../helpers/db-operation';
import { mustMatch } from '../helpers/must-match.validator';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  registerForm: FormGroup;
  users: User[] = [];
  submitted: boolean = false;
  buttonText: string = 'Submit';
  dbops: DBOperation;


  constructor(private _toastr: ToastrService,
    private _formBuilder: FormBuilder,
    private _userService: UserService
  ) { }

  ngOnInit(): void {
    this.setFromState()
    this.getAllUsers()
    // Swal.fire('hi')
    // this._toastr.success('Success','Success Display');
  }
  addEmployeeModal() {

  }
  setFromState() {
    this.buttonText = 'Submit';
    this.dbops = DBOperation.create;
    this.registerForm = this._formBuilder.group({
      id: [0],
      title: ['', Validators.required],
      firstName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      lastName: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(15)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dob: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      acceptTerms : [false, Validators.requiredTrue],
    },
    {
      validators: mustMatch('password','confirmPassword')
    })
  }

  get form(){
    return this.registerForm.controls;
  }

  onSubmit() {
    // console.log(this.registerForm.value);

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    switch (this.dbops) {
      case DBOperation.create:
        this._userService.addUser(this.registerForm.value).subscribe(res =>{
          this._toastr.success('User Inserted Successfully.', 'Good!');
          this.getAllUsers()
          this.onCancel()
        })
        break;
      case DBOperation.update:
        this._userService.updateUser(this.registerForm.value).subscribe(res =>{
          this._toastr.success('User Updated Successfully.', 'Good!');
          this.getAllUsers()
          this.onCancel()
        })
        break
    }
  }

  onCancel() {
    this.registerForm.reset()
    this.buttonText = 'Submit';
    this.dbops = DBOperation.create;
    this.submitted = false;
  }

  getAllUsers() {
    this._userService.getUsers().subscribe((res: User[]) => {
      this.users = res;
      // debugger
      console.log(res);
    })
  }

  // addUser(user: User) {
  //   this._userService.addUser(user).subscribe(res => {
  //     this.getAllUsers()
  //     this._toastr.success('User Inserted Successfully.', 'Good!');
  //   })
  // }

  EditForm(user_id: number) {
    // alert('ss')
    this.buttonText = 'Update';
    this.dbops = DBOperation.update;
    let edit_user = this.users.find((info : User) => info.id === user_id)
    this.registerForm.patchValue(edit_user);
    this.registerForm.get('password').setValue('');
    this.registerForm.get('confirmPassword').setValue('');
    // alert(user_id)
  }
  DeleteForm(user_id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No"
    })
      .then((result) => {
        if (result.value) {
          this._userService.deleteUser(user_id).subscribe(res => {
            this.getAllUsers();
            this._toastr.success('User Delete Successfully.', 'Good!');
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Your record is safe!");
        }
      });
  }
}
