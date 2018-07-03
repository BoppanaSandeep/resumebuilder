import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class ServerRequests {
  constructor(private _http: HttpClient) {}

  private extractData(response: Response) {
    let requestResponse = response;

    return requestResponse || {};
  }

  getServerRequest(url): Observable<any> {
    return (
      this._http
        .get(url)
        .map(this.extractData)
        //.do(data => console.log("Data received: " + JSON.stringify(data)))
        .catch(this.handleError)
    );
  }

  postServerRequest(url, body): Observable<any> {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Headers", "*");

    let options = { headers: headers };
    return this._http
      .post(url, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private handleError(error: HttpResponse<string>) {
    console.error(error);
    return Observable.throw(error || "Server error");
  }
}
