import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderDetails } from '../model';
import { StorageService } from '../services/storage/storage.service';
import { UserOrderService } from '../services/user-order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username!: string
  userOrders: OrderDetails[] = []
  cart: string = "/cart"
  orders: string = "/orders"

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl('');
  }

  constructor(private userOrderSvc: UserOrderService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.username = StorageService.getUserName()
    console.info(this.username)
    this.userOrderSvc.getUserOrders(this.username)
      .then(result => {
        this.userOrders = result
        console.info(">>> order details: ", this.userOrders)
      }).catch(error => {
        console.error(">>> error: ", error)
      })
  }

}
