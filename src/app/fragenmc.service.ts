// fragen.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FragenMcService {
  private fragenUrl = 'assets/fragenmc.json'; //  Pfad zu Multiple Choice Fragen

  constructor(private http: HttpClient) { }

  getFragen(): Observable<any[]> {
    return this.http.get<any[]>(this.fragenUrl);
  }
}
