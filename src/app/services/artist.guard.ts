import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, Subject, Subscription, pipe, BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArtistGuard implements CanActivate {
  constructor(private dataService: DataService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.dataService.getArtists(route.params['artistname']).pipe(
      map((data) => {
        console.log(data);
        if (data.length === 0) {
          console.log('REDIRECTED');
          return this.router.createUrlTree(['error']);
        }

        console.log('DIRECTED');
        return true;
      })
    );
  }
}
