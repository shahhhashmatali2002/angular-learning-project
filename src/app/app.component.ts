import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {Store, select} from '@ngrx/store'
import { getUserLoginItem } from './userLogin.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'learning-angular';
  getUser: any;
  
  private subscription: Subscription;

  constructor(private store: Store<[]>,private router: Router,) {
    debugger
  //   if (!this.getUser) {
  //     this.router.navigate(['/']);
  // }

  // getting user Login data 
  this.subscription = this.store.pipe(select(getUserLoginItem)).subscribe(data => {
    if(data.length == 0){
      this.router.navigate(['/']);
    }
  });
  }

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData() {
    const data = localStorage.getItem('userData')
    
    if(data){
      this.getUser = JSON.parse(data)
    }
  }
}
