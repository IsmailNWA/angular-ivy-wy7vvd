import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient) {}

  public fetchData(): Observable<any> {
    return this.http.get(
      'https://run.mocky.io/v3/62517fc0-d7b2-4339-a29f-8560abd2eb51'
    );
  }
}
