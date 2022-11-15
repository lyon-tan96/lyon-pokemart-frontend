import { Injectable } from '@angular/core';

const TOKEN = 'p_token';
const USER = 'p_user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  
  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static hasToken(): boolean {
    if (this.getToken() === null) {
      return false;
    }
    return true;
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN);
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }


  static getUserName(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.username;
  }

  static getUsername(): string {
    const user = this.getUser();
    if (user == null) { return ''; }
    return user.username;
  }



  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }


}