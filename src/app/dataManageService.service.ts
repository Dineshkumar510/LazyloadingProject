import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataManageServiceService {

  private resultsPerPage = 10;
  private currentPage = 1;

  private apiUrl = 'https://randomuser.me/api';



constructor(private http: HttpClient) { }

getMoreResults(page: number): Observable<any> {
  const url = `${this.apiUrl}?page=${this.currentPage}&results=${page}`;
  return this.http.get(url);
}

}
