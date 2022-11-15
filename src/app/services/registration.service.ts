import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";

@Injectable()
export class RegistrationService {

    constructor(private http: HttpClient) {}

    register(username:string, email:string, password:string, pic: File | Blob) {
        const data = new FormData()
        data.set('username', username)
        data.set('email', email)
        data.set('password', password)
        data.set('myFile', pic)

        return firstValueFrom(this.http.post<any>('/register', data))
    }
}