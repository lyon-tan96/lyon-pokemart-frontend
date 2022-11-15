import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { LoginDetails, UserInfo } from '../model';
import { LoginService } from '../services/login.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  register: string = "register"

  constructor(private fb: FormBuilder, private loginSvc: LoginService, private router: Router, private userStorageService: StorageService) { }

  ngOnInit(): void {
    this.loginForm = this.createForm()
  }

  login() {
    const loginDetail = this.loginForm.value as LoginDetails
    this.loginSvc.login(loginDetail)
      .then(result => {
        console.info(">>> login details: ", result)
        if(StorageService.hasToken()){
          alert('Login successful.')
          // console.info('>>> username: ', result.username)
          this.router.navigateByUrl('/search');
        }else{
          alert('Invalid login credentials. Please register or try again.')
        this.createForm()
        }
      }).catch(error => {
        console.error('>>> login error: ', error)
        alert('Invalid login credentials. Please register or try again.')
        this.createForm()
      })

  }

  createForm(): FormGroup {
    return this.loginForm = this.fb.group({
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required])
    });
  }

}
