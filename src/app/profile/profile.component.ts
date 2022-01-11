import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  firstName!: string;
  lastName!: string;
  username!: string;

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {

    this.http.get('https://dotnet-user-api.herokuapp.com/users/me', {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')!}`
        })     
      })
      .subscribe((res: any)=>{
        const {firstName, lastName, username} = res
        this.firstName = firstName
        this.lastName = lastName
        this.username = username
      })
  }

}
