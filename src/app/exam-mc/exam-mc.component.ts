// check-all.component.ts

// Import-Anweisungen für benötigte Angular-Module und externe Bibliotheken
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { shuffle } from 'lodash';

// Komponenten-Dekorator mit Metadaten für Angular
@Component({
  selector: 'app-exam-mc', // Angular-Selektor für die Verwendung der Komponente
  templateUrl: './exam-mc.component.html', // Pfad zur HTML-Datei für die Darstellung
  styleUrls: ['./exam-mc.component.css'] // Array mit Pfaden zu den CSS-Dateien für das Styling
})

// Die eigentliche Komponentenklasse implementiert OnInit-Interface
export class ExamMcComponent implements OnInit {
  // Deklaration und Initialisierung der Komponenten-Attribute
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswers: any[] = [];
  fillInAnswers: string[] = [];
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;

  // Konstruktor mit Injektion von HttpClient und Router für die Abhängigkeiten
  constructor(private http: HttpClient, private router: Router) { }

  // Implementierung der OnInit-Schnittstelle mit der Methode ngOnInit()
  ngOnInit() {
    // HTTP-Anfrage, um Fragen aus einer JSON-Datei zu laden und zufällig zu mischen
    this.http.get<any[]>('assets/fragenmc.json').subscribe((data: any[]) => {
      // Mische die Fragen zufällig und wähle die ersten 70 aus
      this.questions = shuffle(data).slice(0, 70);
    });
  }

  // Methode zum Um- bzw. Abwählen von Checkboxen bei Multiple Choice Fragen
  toggleCheckbox(index: number) {
    if (!this.selectedAnswers[this.currentQuestionIndex]) {
      this.selectedAnswers[this.currentQuestionIndex] = [];
    }

    const isSelected = this.selectedAnswers[this.currentQuestionIndex].includes(index);

    if (!isSelected) {
      // Wenn die Antwort noch nicht ausgewählt ist, füge sie hinzu
      this.selectedAnswers[this.currentQuestionIndex].push(index);
    } else {
      // Wenn die Antwort bereits ausgewählt ist, entferne sie
      const indexOfItem = this.selectedAnswers[this.currentQuestionIndex].indexOf(index);
      if (indexOfItem !== -1) {
        this.selectedAnswers[this.currentQuestionIndex].splice(indexOfItem, 1);
      }
    }
  }

  // Methode zum Prüfen, ob eine Antwort ausgewählt ist
  isAnswerSelected(index: number): boolean {
    return this.selectedAnswers[this.currentQuestionIndex]?.includes(index) || false;
  }

  // Methode zum Aktualisieren der ausgewählten Antworten bei Single Choice Fragen
  updateSelectedAnswers(index: number) {
    if (!this.selectedAnswers[this.currentQuestionIndex]) {
      this.selectedAnswers[this.currentQuestionIndex] = [];
    }

    if (this.questions[this.currentQuestionIndex].antworten[index].istRichtig) {
      // Wenn die Antwort richtig ist, füge sie zum Array hinzu
      this.selectedAnswers[this.currentQuestionIndex].push(index);
    } else {
      // Wenn die Antwort falsch ist, entferne sie aus dem Array
      const indexOfItem = this.selectedAnswers[this.currentQuestionIndex].indexOf(index);
      if (indexOfItem !== -1) {
        this.selectedAnswers[this.currentQuestionIndex].splice(indexOfItem, 1);
      }
    }
  }

  // Methode zum Wechseln zur nächsten Frage
  nextFrage() {
    console.log("Vor Überprüfung - Richtig: " + this.correctAnswers + ", Falsch: " + this.incorrectAnswers);

    const currentQuestion = this.questions[this.currentQuestionIndex];
    if (
      (currentQuestion.antworten && this.checkMultipleChoiceAnswer()) ||
      (currentQuestion.fillin && this.checkFillInAnswer())
    ) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }

    console.log("Nach Überprüfung - Richtig: " + this.correctAnswers + ", Falsch: " + this.incorrectAnswers);

    if (this.incorrectAnswers >= 7) {
      // Abbruch Meldung!
      window.alert("Prüfung abgebrochen aufgrund von 7 falschen Antworten.");
    } else {
      this.currentQuestionIndex++;
    }
  }

  // Methode zum Wechseln zur vorherigen Frage
  lastFrage() {
    console.log("Vor Überprüfung - Richtig: " + this.correctAnswers + ", Falsch: " + this.incorrectAnswers);
    const currentQuestion = this.questions[this.currentQuestionIndex - 1];
    if (
      (currentQuestion.antworten - 1 && this.checkMultipleChoiceAnswer()) ||
      (currentQuestion.fillin - 1 && this.checkFillInAnswer())
    ) {
      this.correctAnswers--;
    } else {
      this.incorrectAnswers--;
    }
    console.log("Nach Überprüfung - Richtig: " + this.correctAnswers + ", Falsch: " + this.incorrectAnswers);

    this.currentQuestionIndex--;
  }

  // Methode zum Prüfen der ausgewählten Antworten bei Multiple Choice Fragen
  checkMultipleChoiceAnswer(): boolean {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const selected = this.selectedAnswers[this.currentQuestionIndex] || [];
    const correct = currentQuestion.antworten
      .map((answer: any, index: number) => answer.istRichtig ? index : -1)
      .filter((index: number) => index !== -1);

    // Sortiere die Arrays, um sicherzustellen, dass die Reihenfolge keine Rolle spielt
    selected.sort();
    correct.sort();

    return this.arrayEquals(selected, correct);
  }

  // Methode zum Prüfen der ausgewählten Antworten bei Fragentyp "fillin"
  checkFillInAnswer(): boolean {
    return (
      this.fillInAnswers[this.currentQuestionIndex].toLowerCase().trim() ===
      this.questions[this.currentQuestionIndex].fillin.toLowerCase().trim()
    );
  }

  // Hilfsmethode zum Vergleichen von zwei Arrays
  arrayEquals(arr1: any[], arr2: any[]): boolean {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }

  // Methode zum Navigieren zur Trainingsseite
  navigateToTraining() {
    this.router.navigate(['/check-all']);
  }
}
