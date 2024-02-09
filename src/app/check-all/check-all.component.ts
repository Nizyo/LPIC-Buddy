//check-all.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-all',
  templateUrl: './check-all.component.html',
  styleUrls: ['./check-all.component.css']
})
export class CheckAllComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedAnswers: any[] = [];
  fillInAnswers: string[] = [];
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;

  showEvaluation = false;
  displayCorrectAnswer: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    // Daten aus der JSON-Datei laden und in questions-Array speichern
    this.http.get<any[]>('assets/fragen.json').subscribe((data: any[]) => {
      this.questions = data;
    });
  }

  // Methode, um das Training zu beenden
  finishTraining() {
    this.showEvaluation = true;
  }

  // Methode, um zur Trainingsseite zu navigieren
  navigateToTraining() {
    this.router.navigate(['/learn-all']);
  }
  toggleRadiobutton(index: number) {
    if (!this.selectedAnswers[this.currentQuestionIndex]) {
      this.selectedAnswers[this.currentQuestionIndex] = [];
    }
  
    // Setze die ausgewählte Antwort auf das angeklickte Index
    this.selectedAnswers[this.currentQuestionIndex] = [index];
  }
  // Methode, um Checkbox-Auswahl zu aktualisieren
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

  // Methode, um zur nächsten Frage zu wechseln
  nextQuestion() {
    this.displayCorrectAnswer = false;

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      // Setzen Sie die Textfarbe auf den Standardwert (oder wie gewünscht)
      this.questions[this.currentQuestionIndex].textColor = 'black';
    } else {
      // Wenn alle Fragen beantwortet wurden, können Sie hier eine Aktion hinzufügen
      console.log("Alle Fragen beantwortet");
    }

    
  }

  // Methode, um zur letzten Frage zu wechseln
prevQuestion() {
  this.displayCorrectAnswer = false;

  if (this.currentQuestionIndex > 0) {
    this.currentQuestionIndex--;
    // Setzen Sie die Textfarbe auf den Standardwert (oder wie gewünscht)
    this.questions[this.currentQuestionIndex].textColor = 'black';
  } else {
    // Falls dies die erste Frage ist, können Sie hier eine Aktion hinzufügen
    console.log("Das ist bereits die erste Frage");
  }
}


  // Methode, um zu überprüfen, ob eine Antwort ausgewählt ist
  isAnswerSelected(index: number): boolean {
    return this.selectedAnswers[this.currentQuestionIndex]?.includes(index) || false;
  }

  // Methode, um ausgewählte Antworten zu aktualisieren
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

  // Methode, um zu überprüfen, ob die Mehrfachauswahlantwort korrekt ist
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

  // Methode, um zu überprüfen, ob die Frage korrekt beantwortet wurde
  isQuestionCorrect(): boolean {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const isCorrect =
      (currentQuestion.antworten && this.checkMultipleChoiceAnswer()) ||
      (currentQuestion.fillin && this.checkFillInAnswer());

    return isCorrect;
  }

  // Methode, um die richtige Antwort abzurufen
  getCorrectAnswer(): string {
    const currentQuestion = this.questions[this.currentQuestionIndex];

    if (currentQuestion.antworten) {
      const correctAnswers = currentQuestion.antworten
        .filter((answer: any) => answer.istRichtig)
        .map((answer: any) => answer.option);
      return correctAnswers.join(', ');
    } else if (currentQuestion.fillin) {
      return currentQuestion.fillin;
    } else {
      return ''; // Fügen Sie hier die Logik für andere Fragetypen hinzu, falls vorhanden
    }
  }
  istMehrAlsEineRichtigeAntwort(antworten: any[]): boolean {
    return antworten.filter(a => a.istRichtig).length > 1;
  }
  // Methode, um die Fill-in-the-Blank-Antwort zu überprüfen
  checkFillInAnswer(): boolean {
    return (
      this.fillInAnswers[this.currentQuestionIndex].toLowerCase().trim() ===
      this.questions[this.currentQuestionIndex].fillin.toLowerCase().trim()
    );
  }

  // Methode, um die Antwort zu überprüfen und Ergebnisse zu aktualisieren
  checkAnswer() {
    console.log("Vor Überprüfung - Richtig: " + this.correctAnswers + ", Falsch: " + this.incorrectAnswers);
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const isCorrect =
      (currentQuestion.antworten && this.checkMultipleChoiceAnswer()) ||
      (currentQuestion.fillin && this.checkFillInAnswer());

    if (isCorrect) {
      this.correctAnswers++;
    } else {
      this.incorrectAnswers++;
    }
    console.log("Nach Überprüfung - Richtig: " + this.correctAnswers + ", Falsch: " + this.incorrectAnswers);

    // Fragentext einfärben basierend auf Richtigkeit
    currentQuestion.textColor = isCorrect ? 'green' : 'red';
    this.displayCorrectAnswer = true;
    if (this.incorrectAnswers >= 7) {
      // Abbruch Meldung!
      window.alert("Prüfung abgebrochen aufgrund von 7 falschen Antworten.");
    } 
  }

  // Methode, um zu überprüfen, ob zwei Arrays gleich sind
  arrayEquals(arr1: any[], arr2: any[]): boolean {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
  }
}
