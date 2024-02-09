// fragen.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FragenService {
  private fragenUrl = 'assets/fragen.json'; //  Pfad zu allen Fragen

  constructor(private http: HttpClient) { }

  getFragen(): Observable<any[]> {
    return this.http.get<any[]>(this.fragenUrl);
  }
}
