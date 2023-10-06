import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataManageServiceService {

  private apiUrl = 'https://randomuser.me/api';



constructor(private http: HttpClient) { }

getMoreResults(page: number): Observable<any> {
  const url = `${this.apiUrl}/?page=1&results=${page}`;
  return this.http.get(url);
}

}
