import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from './env';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.url !== `${environment}/auth/register` && req.url !== `${environment}/auth/authenticate`){
    const token = sessionStorage.getItem('token') ;
    const newReq = req.clone({
      setHeaders: {
        'Authorization' : `Bearer ${token}`
      }
    }) ;
 
    return next(newReq) ;
  }
  return next(req); 
};
