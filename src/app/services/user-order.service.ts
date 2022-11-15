import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { LineItems, OrderDetails } from "../model";
import { StorageService } from "./storage/storage.service";

@Injectable()
export class UserOrderService {

    constructor(private http: HttpClient) {}

    getUserOrders(username: string) {

        const headers = this.createHttpHeader()

        return firstValueFrom(this.http.get<OrderDetails[]>(`/api/orders/${username}`, {headers}))
    }

    getOrderLineItems(orderId: string, username: string) {

        const headers = this.createHttpHeader()

        return firstValueFrom(this.http.get<LineItems[]>(`/api/orders/${username}/${orderId}`, {headers}))
    }

    createHttpHeader(): HttpHeaders {
        const headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + StorageService.getToken())
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
        return headers
      }
}