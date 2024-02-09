// fragen.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FragenScService {
  private fragenUrl = 'assets/fragensc.json'; //  Pfad zu Single Choice Fragen

  constructor(private http: HttpClient) { }

  getFragen(): Observable<any[]> {
    return this.http.get<any[]>(this.fragenUrl);
  }
}
