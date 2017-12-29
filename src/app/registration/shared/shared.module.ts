import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorHeaderComponent } from './components/error-header/error-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoadingComponent,
    ErrorHeaderComponent
  ],
  exports: [
    LoadingComponent,
    ErrorHeaderComponent
  ]
})
export class SharedModule { }
