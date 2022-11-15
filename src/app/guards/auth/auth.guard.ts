import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(StorageService.hasToken())
    if(!StorageService.hasToken()){
      StorageService.signOut();
      alert('You Are Not LoggedIn. Please Login First!!!')
      this.router.navigateByUrl('');
     
      return false;
    }
    return true;
  }
  
}
