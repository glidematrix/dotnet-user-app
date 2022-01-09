import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  isLoading: boolean = false;
  errMsg!: string;


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: '',
      lastName: '',
      username: '',
      password: '',
    })
  }

  submit(): void{ 
    this.isLoading = true;
    this.http.post('https://dotnet-user-api.herokuapp.com/users/register', this.form.getRawValue())
      .subscribe((res: any)=>{
        this.isLoading = false;
        const {message} = res;
        this.errMsg = message;
      })
  }

}
