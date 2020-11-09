import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Lagre} from './lagre/lagre';
import { Liste } from './liste/liste';
import { Svar } from './svar/svar';

const appRoots: Routes = [
  { path: 'liste', component: Liste },
  { path: 'lagre', component: Lagre },
  { path: 'svar', component: Svar, },
  { path: '', redirectTo: '/liste', pathMatch: 'full' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoots)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
