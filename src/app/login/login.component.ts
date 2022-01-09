import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    })
  }


  submit(): void{ 
    console.log(this.form.getRawValue())

    this.isLoading = true

    this.http.post('https://dotnet-user-api.herokuapp.com/users/authenticate', this.form.getRawValue())
      .subscribe((res: any)=>{
        const {token} = res
        localStorage.setItem('token', token)
        this.isLoading = false
        this.router.navigate(['/'])
      })
  }
}
