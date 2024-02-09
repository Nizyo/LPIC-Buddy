// import-Anweisungen für Angular-Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// import-Anweisungen für eigene Komponenten und Services
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LearnAllComponent } from './learn-all/learn-all.component';
import { LearnMcComponent } from './learn-mc/learn-mc.component';
import { LearnFillinComponent } from './learn-fillin/learn-fillin.component';
import { LearnScComponent } from './learn-sc/learn-sc.component';
import { CheckAllComponent } from './check-all/check-all.component';
import { ExamAllComponent } from './exam-all/exam-all.component';
import { CheckMcComponent } from './check-mc/check-mc.component';
import { CheckScComponent } from './check-sc/check-sc.component';
import { CheckFillinComponent } from './check-fillin/check-fillin.component';

// import-Anweisungen für eigene Services
import { FragenFillinService } from './fragenfillin.service';
import { FragenMcService } from './fragenmc.service';
import { FragenScService } from './fragensc.service';
import { ExamScComponent } from './exam-sc/exam-sc.component';
import { ExamMcComponent } from './exam-mc/exam-mc.component';
import { ExamFillinComponent } from './exam-fillin/exam-fillin.component';

@NgModule({
  // Deklarationen der Komponenten
  declarations: [
    AppComponent,
    LearnAllComponent,
    LearnMcComponent,
    LearnFillinComponent,
    LearnScComponent,
    CheckAllComponent,
    ExamAllComponent,
    CheckMcComponent,
    CheckScComponent,
    CheckFillinComponent,
    ExamScComponent,
    ExamMcComponent,
    ExamFillinComponent,
    
    
  ],
  // Import der Angular-Module
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    CommonModule
  ],
  // Provider für Services
  providers: [FragenFillinService, FragenMcService,FragenScService],
  // Startkomponente
  bootstrap: [AppComponent]
})
export class AppModule { }
