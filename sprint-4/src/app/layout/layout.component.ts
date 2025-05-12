import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../footer/footer.component';
import {HeaderComponent} from '../header/header.component';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent,
    IonicModule
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
