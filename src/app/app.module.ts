import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration.component';
import { RegistrationService } from './services/registration.service';
import { LoginComponent } from './components/login.component';
import { LoginService } from './services/login.service';
import { SearchComponent } from './components/search.component';
import { CardSearchService } from './services/card-search.service';
import { CartComponent } from './components/cart.component';
import { CartService } from './services/cart.services';
import { CheckoutComponent } from './components/checkout.component';
import { CheckoutService } from './services/checkout.service';
import { SuccessComponent } from './components/success.component';
import { ProfileComponent } from './components/profile.component';
import { UserOrderService } from './services/user-order.service';
import { OrdersComponent } from './components/orders.component';
import { NoAuthGuard } from './guards/noAuth/no-auth.guard';
import { AuthGuard } from './guards/auth/auth.guard';

const appRoutes: Routes = [
  { path: '', component: LoginComponent,  canActivate: [NoAuthGuard]},
  { path: 'search', component: SearchComponent,  canActivate: [AuthGuard]},
  { path: 'register', component: RegistrationComponent, canActivate: [NoAuthGuard]},
  { path: 'cart', component: CartComponent,  canActivate: [AuthGuard]},
  { path: 'checkout', component: CheckoutComponent,  canActivate: [AuthGuard]},
  { path: 'checkout/success', component: SuccessComponent,  canActivate: [AuthGuard]},
  { path: 'orders', component: ProfileComponent,  canActivate: [AuthGuard]},
  { path: 'orders/:orderId', component: OrdersComponent,  canActivate: [AuthGuard]},

  { path: '**', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    SearchComponent,
    CartComponent,
    CheckoutComponent,
    SuccessComponent,
    ProfileComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [RegistrationService, LoginService, CardSearchService, SearchComponent, CartService, CheckoutService, UserOrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
