import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { CardDetail, CartItem } from "../model";
import { StorageService } from "./storage/storage.service";

@Injectable()
export class CardSearchService {

    constructor(private http: HttpClient) {}

    searchCard(searchTerm: string) {

      const headers = this.createHttpHeader()

        const params = new HttpParams()
                .set("q", searchTerm)

        return firstValueFrom(this.http.get<any>('/api/search', { params, headers }))
    }

    addToCart(cartItem: CartItem) {

      const headers = this.createHttpHeader()

      return firstValueFrom(this.http.post<any>('/api/addToCart', cartItem, {headers}))
    }

    getCartItems(username: string) {

      const headers = this.createHttpHeader()

      return firstValueFrom(this.http.get<CartItem[]>(`api/${username}/getCart`, {headers}))
    }
    
      createHttpHeader(): HttpHeaders {
        const headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + StorageService.getToken())
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
        return headers
      }
    
}