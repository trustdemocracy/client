import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptionsArgs } from '@angular/http';
import { AuthenticationService } from "app/_services/authentication.service";
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import { Subscribable } from "rxjs/Observable";

@Injectable()
export class HttpService {

  constructor(private http: Http, private authService: AuthenticationService) {
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.encapsulateWithRefresh(
      () => this.http.get(url, this.appendAuthHeader(options))
    );
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.encapsulateWithRefresh(
      () => this.http.post(url, body, this.appendAuthHeader(options))
    );
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.encapsulateWithRefresh(
      () => this.http.put(url, body, this.appendAuthHeader(options))
    );
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.encapsulateWithRefresh(
      () => this.http.delete(url, this.appendAuthHeader(options))
    );
  }


  private appendAuthHeader(options: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = {};
    }
    if (options.headers == null) {
      options.headers = new Headers();
    }
    options.headers.append('Authorization', this.authService.getAuthorizationHeader());
    return options;
  }

  private encapsulateWithRefresh(generator: (() => Observable<Response>)): Observable<Response> {
    return generator()
      .catch((error: Response) => {
        if (error.status === 401) {
          return this.authService.refreshAccessToken()
            .flatMap((success: boolean) => {
              if (success) {
                return generator();
              } else {
                return Observable.throw(error);
              }
            });
        }
        return Observable.throw(error);
      });
  }
}
