import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BehaviorsGsComponent } from './comportamenti-goal-setting/behaviors-gs/behaviors-gs.component';

const routes: Routes = [
  { path: '', component: BehaviorsGsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
