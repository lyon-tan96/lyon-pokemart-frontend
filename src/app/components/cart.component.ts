import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardDetail, CartItem } from '../model';
import { CardSearchService } from '../services/card-search.service';
import { CartService } from '../services/cart.services';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  totalPrice: string = ''
  username = ''
  cartItem!: CartItem
  itemsInCart: CartItem[] = []
  cart: string = "/cart"
  orders: string = "/orders"

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl('');
  }

  constructor(private router: Router, private route: ActivatedRoute, private cardSearchSvc: CardSearchService, private cartSvc: CartService) {  }

  ngOnInit(): void {
    this.username = StorageService.getUserName()
    this.cardSearchSvc.getCartItems(this.username)
      .then(result => {
        console.info('>>> items in cart: ', result)
        this.itemsInCart = result
        this.totalPrice = this.itemsInCart.map(p => parseFloat(p.price)).reduce((a,b) => a + b).toFixed(2)
      }).catch(error => {
        console.error(">>> error: ", error)
      })    
  }

  removeFromCart($event: any) {
    if (confirm(`Remove ${$event.cardName} from cart?`)){
      this.cartSvc.removeItemFromCartId($event)
        .then(result => {
          console.info('>>> remove item from cart: ', result)
          alert(`${$event.cardName} removed from cart.`)
        }).catch(error => {
          console.error('>>> error: ', error)
        })
      }
    location.reload()
  }

  clearCart() {
    if (confirm(`Remove ALL items from cart?`)){
      this.cartSvc.removeItemFromCartUser(this.username)
        .then(result => {
          console.info(result, ` >>> all items removed from ${this.username}'s cart.`)
          alert('All items has been removed from cart.')
        }).catch(error => {
          console.error(">>> error: ", error)
        })
    }
    location.reload()

  }

  checkout() {
    this.router.navigate(['/checkout'])
  }

  backToSearch() {
    this.router.navigate(['/search'])
  }
}
