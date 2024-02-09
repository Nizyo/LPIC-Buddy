// check-fillin.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { FragenFillinService } from '../fragenfillin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-fillin',
  templateUrl: './check-fillin.component.html',
  styleUrls: ['./check-fillin.component.css']
})
export class CheckFillinComponent implements OnInit {
  // Array zur Speicherung von Fragen
  fragen: any[] = [];
  // Objekt zur Speicherung von Benutzerantworten
  userAntworten: { [key: string]: string } = {};
  // Index der aktuellen Frage
  currentQuestionIndex = 0;
  // Anzahl der korrekten Antworten
  correctAnswers = 0;
  // Anzahl der falschen Antworten
  incorrectAnswers = 0;
  // Flag für die Anzeige der Auswertung
  showEvaluation = false;

  // Konstruktor mit Injektion des FragenFillinService und des Routers
  constructor(@Inject(FragenFillinService) private fragenFillinService: FragenFillinService, private router: Router) { }

  // Initialisierungsmethode, die beim Start der Komponente aufgerufen wird
  ngOnInit(): void {
    // Abonnement auf den FragenFillinService, um Fragen zu erhalten
    this.fragenFillinService.getFragen().subscribe(data => {
      // Zuweisen der Fragen mit Index zu jedem Element im Array
      this.fragen = data.map((frage, index) => ({ ...frage, index: index.toString() }));
      // Initialisieren der Benutzerantworten für jede Frage
      this.fragen.forEach(frage => this.userAntworten[frage.index] = '');
    });
  }

  // Methode zum Navigieren zur Trainingsseite
  navigateToTraining() {
    this.router.navigate(['/learn-fillin']);
  }

  // Methode zum Beenden des Trainings und Anzeigen der Auswertung
  finishTraining() {
    this.showEvaluation = true;
  }
  nextQuestion() {
    

    if (this.currentQuestionIndex < this.fragen.length - 1) {
      this.currentQuestionIndex++;
      // Setzen Sie die Textfarbe auf den Standardwert (oder wie gewünscht)
      this.fragen[this.currentQuestionIndex].textColor = 'black';
    } else {
      // Wenn alle Fragen beantwortet wurden, können Sie hier eine Aktion hinzufügen
      console.log("Alle Fragen beantwortet");
    }

    
  }
  // Methode zum Abrufen der Benutzerantwort für eine bestimmte Frage
  getUserAntwort(index: string): string {
    return this.userAntworten[index] || '';
  }

  // Methode zum Setzen der Benutzerantwort für eine bestimmte Frage
  setUserAntwort(index: string, antwort: string): void {
    this.userAntworten[index] = antwort;
  }

  // Methode zur Überprüfung, ob die Benutzerantwort korrekt ist
  isAntwortRichtig(frage: any): boolean {
    return frage.antwort.toLowerCase() === this.userAntworten[frage.index]?.toLowerCase();
  }
  prevQuestion() {
    
  
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      // Setzen Sie die Textfarbe auf den Standardwert (oder wie gewünscht)
      this.fragen[this.currentQuestionIndex].textColor = 'black';
    } else {
      // Falls dies die erste Frage ist, können Sie hier eine Aktion hinzufügen
      console.log("Das ist bereits die erste Frage");
    }
  }
  // Methode zur Bestätigung der Benutzerantwort für eine bestimmte Frage
  bestaetigeAntwort(frage: any): void {
    // Extrahieren der Benutzerantwort und der korrekten Antwort für die aktuelle Frage
    const benutzerAntwort = this.userAntworten[frage.index];
    const korrekteAntwort = frage.fillin.toLowerCase();
    

    if (benutzerAntwort.toLowerCase() === korrekteAntwort) {
        // Benutzerantwort ist korrekt, erhöhe die Anzahl der korrekten Antworten
        this.correctAnswers++;
        
    } else {
        // Benutzerantwort ist falsch, erhöhe die Anzahl der falschen Antworten

        if (this.incorrectAnswers >= 7) {
            // Training vorzeitig beenden, wenn 7 falsche Antworten erreicht wurden
            this.finishTraining();
            window.alert('Leider zu viele falsche Antworten. Training beendet.');
            return;
        }

        // Meldung bei falscher Antwort / zeigt die korrekte Antwort an
        const meldung = `Falsch! Die korrekte Antwort lautet: ${frage.fillin.toLowerCase()}`;
        window.alert(meldung);
        this.incorrectAnswers++;
    }

    // Nächste Frage anzeigen
    this.currentQuestionIndex++;

    // Optional: Zurücksetzen der Benutzerantwort für die nächste Frage
    this.userAntworten[frage.index] = '';
  }
}
