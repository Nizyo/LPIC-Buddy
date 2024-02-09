// learn-all.component.ts

import { Component, OnInit } from '@angular/core';
import { FragenService } from '../fragen.service';

@Component({
  selector: 'app-learn-all',
  templateUrl: './learn-all.component.html',
  styleUrls: ['./learn-all.component.css']
})
export class LearnAllComponent implements OnInit {
  // Array zum Speichern der Fragen
  fragen: any[] = [];
  
  // Arrays zur Steuerung der Anzeige der Antworten für Multiple-Choice- und Fill-in-Fragen
  zeigeAntwortenFlags: boolean[] = [];
  zeigeAntwortenFillin: boolean[] = [];

  // Index der aktiven Frage
  aktiveFrageIndex: number | null = null;

  // Konstruktor, der den FragenService injiziert
  constructor(private fragenService: FragenService) { }

  // OnInit Lifecycle-Hook, der beim Initialisieren der Komponente aufgerufen wird
  ngOnInit(): void {
    // Aufruf des getFragen-Methode des FragenService, um die Fragen zu erhalten
    this.fragenService.getFragen().subscribe(data => {
      // Speichern der erhaltenen Fragen im fragen-Array
      this.fragen = data;

      // Initialisierung der Arrays für die Steuerung der Antwortanzeige
      this.zeigeAntwortenFlags = new Array(data.length).fill(false);
      this.zeigeAntwortenFillin = new Array(data.length).fill(false);
    });
  }

  // Methode zum Anzeigen der Antworten für Multiple-Choice-Fragen
  zeigeAntworten(frageIndex: number): void {
    // Überprüfung, ob eine andere Frage aktiv ist und Zurücksetzen des Flags
    if (this.aktiveFrageIndex !== null && this.aktiveFrageIndex !== frageIndex) {
      this.zeigeAntwortenFlags[this.aktiveFrageIndex] = false;
    }

    // Aktualisierung des aktiven Frageindex
    this.aktiveFrageIndex = frageIndex;

    // Umkehrung des Anzeige-Flags für die ausgewählte Frage
    this.zeigeAntwortenFlags[frageIndex] = !this.zeigeAntwortenFlags[frageIndex];
  }

  // Methode zum Anzeigen der Antworten für Fill-in-Fragen
  zeigeFillin(frageIndex: number): void {
    // Aktualisierung des aktiven Frageindex und Setzen des Fillin-Anzeige-Flags
    this.aktiveFrageIndex = frageIndex;
    this.zeigeAntwortenFillin[frageIndex] = true;
  }

  // Methode zur Überprüfung, ob eine Antwort korrekt ist (für Farb- und Fettdruck-Steuerung)
  isAntwortRichtig(antwort: any, frageIndex: number): boolean {
    return (antwort.istRichtig && this.zeigeAntwortenFlags[frageIndex]);
  }
}
