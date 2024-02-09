// learn-mc.component.ts

import { Component, OnInit } from '@angular/core';
import { FragenMcService } from '../fragenmc.service';

@Component({
  selector: 'app-learn-mc',
  templateUrl: './learn-mc.component.html',
  styleUrls: ['./learn-mc.component.css']
})
export class LearnMcComponent implements OnInit {
  fragen: any[] = []; // Array zur Speicherung von Multiple-Choice-Fragen
  zeigeAntwortenFlags: boolean[] = []; // Array für die zeigeAntwortenFlags pro Frage
  aktiveFrageIndex: number | null = null; // Index der gerade aktiven Frage

  constructor(private fragenMcService: FragenMcService) { }

  ngOnInit(): void {
    // Lade die Multiple-Choice-Fragen beim Initialisieren der Komponente
    this.fragenMcService.getFragen().subscribe(data => {
      this.fragen = data;
      this.zeigeAntwortenFlags = new Array(data.length).fill(false); // Initialisiere das Array
    });
  }

  // Methode zum Anzeigen oder Ausblenden der Antworten für eine bestimmte Frage
  zeigeAntworten(frageIndex: number): void {
    // Überprüfe, ob bereits eine Frage aktiv ist und setze ihre Antwort auf Schwarz
    if (this.aktiveFrageIndex !== null && this.aktiveFrageIndex !== frageIndex) {
      this.zeigeAntwortenFlags[this.aktiveFrageIndex] = false;
    }

    // Setze den Index der aktuellen Frage
    this.aktiveFrageIndex = frageIndex;

    // Toggle für die Anzeige der Antworten der aktuellen Frage
    this.zeigeAntwortenFlags[frageIndex] = !this.zeigeAntwortenFlags[frageIndex];
  }

  // Methode zur Überprüfung, ob eine Antwort als richtig markiert und angezeigt wird
  isAntwortRichtig(antwort: any, frageIndex: number): boolean {
    return (antwort.istRichtig && this.zeigeAntwortenFlags[frageIndex]);
  }
}
