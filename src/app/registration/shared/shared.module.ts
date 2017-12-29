import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorHeaderComponent } from './components/error-header/error-header.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoadingComponent,
    ErrorHeaderComponent,
    PageHeaderComponent
  ],
  exports: [
    LoadingComponent,
    ErrorHeaderComponent,
    PageHeaderComponent
  ]
})
export class SharedModule { }
