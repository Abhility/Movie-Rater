import { Injectable, Injector} from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }
  intercept(req, next) {
    const auth = this.injector.get(AuthenticationService);
    const token = auth.getToken('token');
    const usertoken = auth.getToken('usertoken');
    let transformedReq: any;
    if (token) {
       transformedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
       if (usertoken) {
        transformedReq = transformedReq.clone({
         setHeaders: {
          UserToken: usertoken
         }
       });
     }
       return next.handle(transformedReq);
    }
    return next.handle(req);
  }
}
