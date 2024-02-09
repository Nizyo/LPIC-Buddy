// app-routing.module.ts

// Import-Anweisungen für Angular-Module und Routen
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import-Anweisungen für die Komponenten, die in den Routen verwendet werden
import { LearnAllComponent } from './learn-all/learn-all.component';
import { LearnMcComponent } from './learn-mc/learn-mc.component';
import { LearnScComponent } from './learn-sc/learn-sc.component';
import { LearnFillinComponent } from './learn-fillin/learn-fillin.component';
import { CheckAllComponent } from './check-all/check-all.component';
import { ExamAllComponent } from './exam-all/exam-all.component';
import { CheckMcComponent } from './check-mc/check-mc.component';
import { CheckScComponent } from './check-sc/check-sc.component';
import { CheckFillinComponent } from './check-fillin/check-fillin.component';
import { ExamMcComponent } from './exam-mc/exam-mc.component';
import { ExamScComponent } from './exam-sc/exam-sc.component';
import { ExamFillinComponent } from './exam-fillin/exam-fillin.component';

// Definition der Routen für die Angular-Anwendung
const routes: Routes = [
  { path: 'learn-all', component: LearnAllComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'learn-mc', component: LearnMcComponent },
  { path: 'learn-sc', component: LearnScComponent },
  { path: 'learn-fillin', component: LearnFillinComponent },
  { path: 'check-all', component: CheckAllComponent },
  { path: 'exam-all', component: ExamAllComponent },
  { path: 'check-mc', component: CheckMcComponent },
  { path: 'check-sc', component: CheckScComponent },
  { path: 'check-fillin', component: CheckFillinComponent },
  { path: 'exam-mc', component: ExamMcComponent},
  { path: 'exam-sc', component: ExamScComponent},
  { path: 'exam-fillin', component: ExamFillinComponent}
];

// Definition des Angular-Modules für die Routing-Konfiguration
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
