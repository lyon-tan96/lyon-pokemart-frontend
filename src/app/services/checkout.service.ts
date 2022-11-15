import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map } from "rxjs";
import { StorageService } from "./storage/storage.service";

@Injectable()
export class CheckoutService {

    constructor(private http: HttpClient) { }
    
    getAddressDetails(postalCode: string) {

        const params = new HttpParams()
            .set('searchVal', postalCode)
            .set('returnGeom', 'Y')
            .set('getAddrDetails', 'Y')

        return firstValueFrom(this.http.get<any>('https://developers.onemap.sg/commonapi/search', {params})
                .pipe(map(result => {
                    const data = result.results
                    return data
                }))
        )
    }

    createNewOrder(newOrder: any) {
        const headers = this.createHttpHeader()

        return firstValueFrom(this.http.post<any>('/api/newOrder', newOrder , { headers }))
    }

    createHttpHeader(): HttpHeaders {
        const headers = new HttpHeaders()
          .set('Authorization', 'Bearer ' + StorageService.getToken())
        return headers
      }
    
}