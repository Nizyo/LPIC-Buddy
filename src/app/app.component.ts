// app.component.ts
import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title: string = 'LPIC-Prüfungssimulator';
  constructor(private router: Router) {}
  showPreloader: boolean = true;

  
  ngOnInit() {
    // Simuliere eine Verzögerung von 2 Sekunden (2000 Millisekunden)
    setTimeout(() => {
      // Nach der Verzögerung verstecke den Preloader
      this.showPreloader = false;
    }, 2000);
  }

  isStartseite() {  // Methode für den Inhalt der Startseite
    return this.router.url === '/';
  }
}
