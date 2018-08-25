import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LoadingComponent } from './components/loading/loading.component';
import { ErrorHeaderComponent } from './components/error-header/error-header.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { BtnGroupComponent } from './components/btn-group/btn-group.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoadingComponent,
    ErrorHeaderComponent,
    PageHeaderComponent,
    BtnGroupComponent
  ],
  exports: [
    LoadingComponent,
    ErrorHeaderComponent,
    PageHeaderComponent,
    BtnGroupComponent
  ]
})
export class SharedModule { }
