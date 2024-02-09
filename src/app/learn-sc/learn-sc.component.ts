// learn-sc.component.ts

// Import-Anweisungen für Angular-Komponenten und den Service für Single-Choice-Fragen
import { Component, OnInit } from '@angular/core';
import { FragenScService } from '../fragensc.service';

// Definition der Angular-Komponente für das Anzeigen von Single-Choice-Fragen
@Component({
  selector: 'app-learn-sc',
  templateUrl: './learn-sc.component.html',
  styleUrls: ['./learn-sc.component.css']
})
export class LearnScComponent implements OnInit {
  // Deklaration von Variablen für die Fragen, die Zustände der Antwortanzeigen und den Index der aktiven Frage
  fragen: any[] = [];
  zeigeAntwortenFlags: boolean[] = []; // Array für die zeigeAntwortenFlags pro Frage
  aktiveFrageIndex: number | null = null; // Index der gerade aktiven Frage

  // Konstruktor der Komponente, der den Service für Single-Choice-Fragen injiziert
  constructor(private fragenScService: FragenScService) { }

  // Lifecycle-Hook für Initialisierung, wird bei Erstellung der Komponente aufgerufen
  ngOnInit(): void {
    // Aufruf des Service, um die Fragen zu erhalten
    this.fragenScService.getFragen().subscribe(data => {
      // Zuweisung der erhaltenen Fragen und Initialisierung des Zustands-Arrays
      this.fragen = data;
      this.zeigeAntwortenFlags = new Array(data.length).fill(false);
    });
  }

  // Methode zum Anzeigen der richtigen Antwort für eine bestimmte Frage
  zeigeAntworten(frageIndex: number): void {
    // Überprüfung, ob eine vorherige Frage aktiv war und Zurücksetzen des Zustands
    if (this.aktiveFrageIndex !== null && this.aktiveFrageIndex !== frageIndex) {
      this.zeigeAntwortenFlags[this.aktiveFrageIndex] = false;
    }

    // Aktualisierung des Index der aktiven Frage
    this.aktiveFrageIndex = frageIndex;

    // Toggle für die Anzeige der Antwort für die aktuelle Frage
    this.zeigeAntwortenFlags[frageIndex] = !this.zeigeAntwortenFlags[frageIndex];
  }

  // Methode zum Überprüfen, ob eine Antwort als richtig markiert ist und angezeigt werden soll
  isAntwortRichtig(antwort: any, frageIndex: number): boolean {
    return (antwort.istRichtig && this.zeigeAntwortenFlags[frageIndex]);
  }
}
