import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

const modPrime: any = [
  AvatarModule,
  ButtonModule,
  MenubarModule,
  ToolbarModule,
  TooltipModule,
  MenuModule,
  CardModule,
  InputTextModule,
  ToastModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    modPrime
  ],
  exports:[
    modPrime
  ]
})
export class PrimengModule { }
