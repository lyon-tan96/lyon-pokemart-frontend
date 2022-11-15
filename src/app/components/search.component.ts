import { ɵparseCookieValue } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectableObservable } from 'rxjs';
import { CardDetail, CartItem, Order } from '../model';
import { CardSearchService } from '../services/card-search.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm!: FormGroup
  cardList: CardDetail[] = []
  order!: Order
  username!: string
  cartItem!: CartItem
  itemsInCart!: CartItem[]
  totalItems!: 0
  cart: string = "/cart"
  orders: string = "/orders"

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl('');
  }

  constructor(private fb: FormBuilder, private cardSearchSvc: CardSearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.totalItems = 0
    this.cartItem = {
      cartId: 0,
      username: '',
      image: '',
      cardId: '',
      cardName: '',
      price: '',
      quantity: 0
    }

    this.username = StorageService.getUserName()
    this.cartItem.username = this.username

    this.cardSearchSvc.getCartItems(this.username)
      .then(result => {
        this.itemsInCart = result
        console.info('>>> items in cart: ', result)
      }).catch(error => {
        console.error(">>> error: ", error)
      })
    this.searchForm = this.createSearchForm()
  }

  createSearchForm() {
    return this.fb.group({
      searchTerm: this.fb.control<string>('', [Validators.required])
    });
  }

  processSearch() {
    console.info('>>> process search: ', this.searchForm.value)
    this.cardSearchSvc.searchCard(this.searchForm.get('searchTerm')?.value)
        .then(result => {
          console.info('>>>> result: ', result)
          this.cardList = result
        }).catch(error => {
          console.error('>>>> search error: ', error)
        })

  }

  addToCart($event: CardDetail) {

    this.cartItem.image = $event.image
    this.cartItem.cardName = $event.cardName
    this.cartItem.cardId = $event.id
    this.cartItem.price = $event.price
    this.cartItem.quantity = 1
    
    this.cardSearchSvc.addToCart(this.cartItem)
          .then(result => {
            console.info('>>> posted to cart: ', result)
          }).catch(error => {
            console.error('>>> add to cart error: ', error)
          })
    this.itemsInCart.push(this.cartItem)

    console.info("current cart: ", this.itemsInCart)
    
    alert(`${this.cartItem.cardName} added to cart. There are currently ${this.itemsInCart.length} items in cart.`)
  
  }

  viewCart() {
    this.router.navigate(['/cart'])
  }

}
