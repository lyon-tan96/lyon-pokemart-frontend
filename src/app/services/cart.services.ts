import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { CartItem } from "../model";
import { StorageService } from "./storage/storage.service";

@Injectable()
export class CartService {

    constructor(private http: HttpClient) {}

    removeItemFromCartId(cartItem: CartItem) {
        const headers = this.createHttpHeader()
        const cartId = cartItem.cartId
        return firstValueFrom(this.http.delete(`/api/deleteCart/${cartId}`, {headers}))
    }

    removeItemFromCartUser(username: string) {
        const headers = this.createHttpHeader()
        return firstValueFrom(this.http.delete(`api/deleteCart/user/${username}`, {headers}))
    }

    createHttpHeader(): HttpHeaders {
        const headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + StorageService.getToken())
        return headers
      }
}