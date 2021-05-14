import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyComponent } from './verify/verify.component';

const routes: Routes = [
  { path: 'verify', component: VerifyComponent},
  { path: '',   redirectTo: '/verify', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
