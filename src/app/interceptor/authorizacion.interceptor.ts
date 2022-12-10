import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthorizacionInterceptor implements HttpInterceptor {

  constructor(
    private localStorage: LocalStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.localStorage.GetSesionToken();
    if(!token){
      return next.handle(request);
    }
    const headers = request.clone({
      headers: request.headers.set('Authorization',`Bearer ${token}`)
    });
    return next.handle(request);

  }
}
