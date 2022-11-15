import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LineItems } from '../model';
import { StorageService } from '../services/storage/storage.service';
import { UserOrderService } from '../services/user-order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  username!: string
  orderId!: string
  lineItems: LineItems[] = []
  totalQuantity!: number
  totalPrice!: number
  cart: string = "/cart"
  orders: string = "/orders"

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl('');
  }

  constructor(private route: ActivatedRoute, private userOrderSvc: UserOrderService, private router: Router) { }

  ngOnInit(): void {
    this.username = StorageService.getUserName()
    this.orderId = this.route.snapshot.params['orderId']

    this.userOrderSvc.getOrderLineItems(this.orderId, this.username)
      .then(result => {
        this.lineItems = result
        this.calculateTotals()
        console.info(">>> line items: ", result)
      }).catch(error => {
        console.error(">>> error: ", error)
      })
    
  }

  calculateTotals() {
    let quantity = 0
    let total = 0
    for (let i = 0; i < this.lineItems.length; i++ ) {
      quantity += this.lineItems[i].quantity
      total += parseFloat(this.lineItems[i].price)
    }
    this.totalQuantity = quantity
    this.totalPrice = Math.round(total*100)/100
  }
  
  goToProfile() {
    this.router.navigate(['/orders'])
  }

}
