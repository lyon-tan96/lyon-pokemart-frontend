import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat } from 'rxjs';
import { CartItem } from '../model';
import { CardSearchService } from '../services/card-search.service';
import { CheckoutService } from '../services/checkout.service';
import { StorageService } from '../services/storage/storage.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  itemsInCart: CartItem[] = []
  username!: string
  totalPrice: string = ''
  checkoutForm!: FormGroup
  map!: google.maps.Map
  lat!: number
  long!: number
  amount!: string
  addressField: boolean =  false
  newOrder = {
    details: {},
    lineItems: this.itemsInCart
  }
  cart: string = "/cart"
  orders: string = "/orders"

  logout(){
    StorageService.signOut();
    this.router.navigateByUrl('');
  }

  constructor(private route: ActivatedRoute, private cardSearchSvc: CardSearchService, private fb: FormBuilder, private checkoutSvc: CheckoutService,
              private router: Router) { }

  @ViewChild('mapContainer', {static: false}) 
  gmap!: ElementRef;

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
    this.checkoutForm = this.createForm()    
  }

  createForm() {
    // console.info('>>> total price: ', this.totalPrice)
    return this.checkoutForm = this.fb.group({
      name: this.fb.control<string>('', [Validators.required]),
      contact: this.fb.control<string>('',[Validators.required, Validators.min(10000000)]),
      postal: this.fb.control<string>('',[Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
      address1: this.fb.control<string>('', [Validators.required]),
      address2: this.fb.control<string>(''),
      username: this.fb.control<string>(this.username),
      amount: this.fb.control<string>('')
    });
  }

  getAddress() {
    const postalCode = this.checkoutForm.controls['postal'].value
    this.checkoutSvc.getAddressDetails(postalCode)
      .then(data => {
        const result = data[0]
        this.lat = result.LATITUDE
        this.long = result.LONGITUDE
        console.info('>>> address result: ', result.BLK_NO + ' ' + result.ROAD_NAME)
        this.mapInitializer()
        this.checkoutForm.controls['address1'].setValue(result.BLK_NO + ' ' + result.ROAD_NAME)
      }
      ).catch(error => {
        alert("Invalid Postal Code!")
        console.error('>>> address error: ', error)
      })

  }

  mapInitializer() {
    var x = document.getElementById("map");
    x.style.display = "block";    
    const coordinates = new google.maps.LatLng(this.lat, this.long)
    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 16,
      }
    const marker = new google.maps.Marker({
      position: coordinates,
      map: this.map,
    });
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    marker.setMap(this.map)
   }

   checkout() {
    if (confirm(`Checkout ${this.itemsInCart.length} items?`)) {
      this.checkoutForm.controls['amount'].setValue(this.totalPrice)
      this.newOrder.details = this.checkoutForm.value
      this.newOrder.lineItems = this.itemsInCart
      console.info('>>>> checkout: ', this.newOrder)
      this.checkoutSvc.createNewOrder(this.newOrder)
        .then(result => {
          console.info("new order: ", result)
          this.router.navigate(['/checkout/success'], {state: {orderId: result.message, name: this.checkoutForm.controls['name'].value, address: this.checkoutForm.controls['address1'].value + ' ' + this.checkoutForm.controls['address2'].value}})
        }).catch(error => {
          console.error("error: ", error)
        })
    }
   }
}
