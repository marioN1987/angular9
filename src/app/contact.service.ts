import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  
  //contactLst: ContactItem[] = [];
  
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  get(){
       const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      
      const getContactsApiUrl = "https://www.forexyahoofinance.mario26tech.com/api/contact/retrieveContact.php";
      
      return this.http.get(getContactsApiUrl,httpOptions).pipe(
                                             map((res: HttpResponse<any>) => res),
                                             catchError(this.handleError)
                                             );
  }

  add(contactItem: any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    
    const insertContactApiUrl = "https://forexyahoofinance.mario26tech.com/api/contact/insertContact.php";

    //console.log("In Service:",contactItem);
    //this.contactLst.push(contactItem);

    return this.http.post(insertContactApiUrl,contactItem, httpOptions).pipe(
            map( (response: any) => response ),
            catchError(this.handleError)
          );

  }

  private handleError(error: HttpErrorResponse){
    console.log(error.message);
    return throwError("An error occured, please try again.");
  }
}

export interface ContactItemResponse{
  contactItems: ContactItem[];
}

export interface ContactItem{
  id: number;
  name: string;
  email: string;
  message: string;
}
