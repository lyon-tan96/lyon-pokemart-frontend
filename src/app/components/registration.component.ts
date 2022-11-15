import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  form!: FormGroup
  
  @ViewChild('toUpload')
  toUpload!: ElementRef

  constructor(private fb: FormBuilder, private registerationSvc: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control<string>('', [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required]),
      pic: this.fb.control<any>('',[Validators.required])
    })
  }

  register() {
    const username = this.form.get('username')?.value
    const email = this.form.get('email')?.value
    const password = this.form.get('password')?.value
    const myFile = this.toUpload.nativeElement.files[0]

    this.registerationSvc.register(username, email, password, myFile)
        .then(result => {
          console.info('>>>> result: ', result)
          alert('Registration Successful!')
          this.router.navigate(['/'])
        }).catch(error => {
          console.error('>>> error: ', error)
          alert('Registration Unsuccessful. Username/Email already in use.')
        })
  }

  backToLogin() {
    this.router.navigate(['/'])
  }

}
