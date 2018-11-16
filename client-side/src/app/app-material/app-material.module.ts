import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule
  ],
  declarations: []
})
export class AppMaterialModule { }
