import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  username!: string
  orderId!: string
  name!: string
  address!: string
  cart: string = "/cart"
  orders: string = "/orders"

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl('');
  }

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.username = StorageService.getUserName()
    this.orderId = history.state.orderId
    this.name = history.state.name
    this.address = history.state.address
    console.info("orderID: ", this.orderId)
  }

  viewOrder() {
    this.router.navigate(['/orders'])
  }

}
