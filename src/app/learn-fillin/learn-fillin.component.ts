// learn-fillin.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { FragenFillinService } from '../fragenfillin.service';

@Component({
  selector: 'app-learn-fillin',
  templateUrl: './learn-fillin.component.html',
  styleUrls: ['./learn-fillin.component.css']
})
export class LearnFillinComponent implements OnInit {
  fragen: any[] = [];

  constructor(@Inject(FragenFillinService) private fragenFillinService: FragenFillinService) { }

  ngOnInit(): void {
    // Laden der Fill-in-Fragen beim Initialisieren der Komponente
    this.fragenFillinService.getFragen().subscribe(data => {
      // Jeder Frage einen eindeutigen Index zuweisen und die Eigenschaften für die Anzeige initialisieren
      this.fragen = data.map((frage, index) => ({ ...frage, index: index.toString(), antwortAngezeigt: false, antwortBestaetigt: false }));
      console.log('Geladene Fragen:', this.fragen);
    });
  }

  zeigeKorrekteAntwort(frage: any): void {
    // Markiere die Antwort als bestätigt und als angezeigt
    frage.antwortBestaetigt = true;
    frage.antwortAngezeigt = true;
    
    // Setze bei allen anderen Fragen die Eigenschaft für die Anzeige zurück
    this.fragen.filter(f => f !== frage).forEach(f => f.antwortAngezeigt = false);
  
    // Konsolenausgabe für Debugging-Zwecke
    console.log('Aktuelle Frage:', frage);
    console.log('Alle Fragen:', this.fragen);
  }
  
}
