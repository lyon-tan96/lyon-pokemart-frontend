import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router,
  ) {}

  title = 'miniproject-front';
  
  cart: string = "cart"
  orders: string = "orders"

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl('');
  }
}
