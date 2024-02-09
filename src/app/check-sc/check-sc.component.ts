// check-sc.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-check-sc',
  templateUrl: './check-sc.component.html',
  styleUrls: ['./check-sc.component.css']
})
export class CheckScComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswers: any[] = [];
  fillInAnswers: string[] = [];
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;

  showEvaluation = false;
  displayCorrectAnswer = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // Laden der Fragen beim Initialisieren der Komponente
    this.http.get<any[]>('assets/fragensc.json').subscribe((data: any[]) => {
      this.questions = data;
    });
  }
  
  // Methode zum Beenden des Trainings und Anzeigen der Auswertung
  finishTraining() {
    this.showEvaluation = true;
  }
  istMehrAlsEineRichtigeAntwort(antworten: any[]): boolean {
    return antworten.filter(a => a.istRichtig).length > 1;
  }
  // Methode zum Navigieren zur Trainingsseite
  navigateToTraining() {
    this.router.navigate(['/learn-sc']);
  }
  toggleRadiobutton(index: number) {
    if (!this.selectedAnswers[this.currentQuestionIndex]) {
      this.selectedAnswers[this.currentQuestionIndex] = [];
    }
  
    // Setze die ausgewählte Antwort auf das angeklickte Index
    this.selectedAnswers[this.currentQuestionIndex] = [index];
  }
  // Methode zur Aktualisierung der ausgewählten Antworten für Single Choice
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
  
  // Methode zur Abrufung der korrekten Antwort für Anzeige
  getCorrectAnswer(): string {
    const currentQuestion = this.questions[this.currentQuestionIndex];
  
    if (currentQuestion.antworten) {
      // Filtere und mappe die richtigen Antworten für Multiple Choice
      const correctAnswers = currentQuestion.antworten
        .filter((answer: any) => answer.istRichtig)
        .map((answer: any) => answer.option);
      return correctAnswers.join(', ');
    } else if (currentQuestion.fillin) {
      return currentQuestion.fillin;
    } else {
      return ''; 
    }
  }

  // Methode zur Überprüfung der Antwort und Aktualisierung der Auswertung
  checkAnswer() {
    console.log("Vor Überprüfung - Richtig: " + this.correctAnswers + ", Falsch: " + this.incorrectAnswers);
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const isCorrect =
      (currentQuestion.antworten && this.checkMultipleChoiceAnswer());
    
    if (
      (currentQuestion.antworten && this.checkMultipleChoiceAnswer()) ||
      (currentQuestion.fillin && this.checkFillInAnswer())
    ) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
    console.log("Nach Überprüfung - Richtig: " + this.correctAnswers + ", Falsch: " + this.incorrectAnswers);
  
    // Fragentext einfärben basierend auf Richtigkeit
    currentQuestion.textColor = isCorrect ? 'green' : 'red';
    this.displayCorrectAnswer = true;
    // Nächste Frage nicht automatisch weiterleiten
  }

  // Methode zur Überprüfung der ausgewählten Antworten für Multiple Choice
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

  // Methode zur Navigation zur nächsten Frage
  nextQuestion() {
    // Prüfen, ob es weitere Fragen gibt, bevor zur nächsten Frage weitergeleitet wird
    this.displayCorrectAnswer = false;
  
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      // Setzen Sie die Textfarbe auf den Standardwert (oder wie gewünscht)
      this.questions[this.currentQuestionIndex].textColor = 'black';
    } else {
      // Wenn alle Fragen beantwortet wurden, Popup ausgabe
      window.alert('Alle Fragen beantwortet');
    }
  }

  // Methode zum Umschalten der Checkbox für Multiple Choice
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
  prevQuestion() {
    
  
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      // Setzen Sie die Textfarbe auf den Standardwert (oder wie gewünscht)
      this.questions[this.currentQuestionIndex].textColor = 'black';
    } else {
      // Falls dies die erste Frage ist, können Sie hier eine Aktion hinzufügen
      console.log("Das ist bereits die erste Frage");
    }
  }
  // Methode zur Überprüfung, ob eine Antwort ausgewählt ist
  isAnswerSelected(index: number): boolean {
    return this.selectedAnswers[this.currentQuestionIndex]?.includes(index) || false;
  }

  // Methode zur Überprüfung der Freitextantwort
  checkFillInAnswer(): boolean {
    return (
      this.fillInAnswers[this.currentQuestionIndex].toLowerCase().trim() ===
      this.questions[this.currentQuestionIndex].fillin.toLowerCase().trim()
    );
  }

  // Methode zur Überprüfung, ob zwei Arrays gleich sind
  arrayEquals(arr1: any[], arr2: any[]): boolean {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }
}
