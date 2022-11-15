import { HttpClient, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, map, tap } from "rxjs";
import { LoginDetails, UserInfo } from "../model";
import { StorageService } from "./storage/storage.service";

export const AUTH_HEADER = 'authorization';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient,
        private userStorageService: StorageService) {}

    // login(loginDetails: LoginDetails) {

    //     return firstValueFrom(this.http.post<any>('login', loginDetails))
    // }

    login(loginDetails) {
        console.log(loginDetails.email)
        // return firstValueFrom(this.http.post<any>('authenticate', loginDetails))
      
        const data = new FormData()
        data.set('email', loginDetails.email)
        data.set('password', loginDetails.password)
        return firstValueFrom(this.http.post<any>(`/authenticate/${loginDetails.email}/${loginDetails.password}`, {
          data
          }, { observe: 'response' })
            .pipe(

              tap(_ => this.log('User Authentication')),
              map((res: HttpResponse<any>) => {
                console.log("res is ervice", res);
                this.userStorageService.saveUser(res.body);
                console.log(res);
                const tokenLength = res.headers.get(AUTH_HEADER).length;
                const bearerToken = res.headers.get(AUTH_HEADER).substring(7, tokenLength);
                this.userStorageService.saveToken(bearerToken);
                return res;
              })))
    }

    getUsernameEmail(email: string){
        const params = new HttpParams()
            .set("emailId", email)

        return firstValueFrom(this.http.get<UserInfo>('/user', { params }))
    }

    log(message: string): void {
        console.log(`User Auth Service: ${message}`);
      }
}