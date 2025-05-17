import { Component, OnInit } from '@angular/core';
import { AboutUsItem } from '../models/about-us.model';
import { AboutUsService } from '../services/about-us.service';
import {IonicModule} from "@ionic/angular";
import {SlicePipe} from "@angular/common";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
  imports: [
    IonicModule,
    SlicePipe,
    CommonModule
  ]
})
export class AboutUsPage implements OnInit {
  aboutIntro: AboutUsItem[] = [];
  aboutGrid: AboutUsItem[] = [];
  aboutLast: AboutUsItem = {} as AboutUsItem;

  constructor(private aboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this.aboutUsService.getAboutUsData().then(data => {
      this.aboutIntro = data.aboutUs_intro.map(item => ({ ...item, expanded: false }));
      this.aboutGrid = data.aboutUs_grid.map(item => ({ ...item, expanded: false }));
      this.aboutLast = { ...data.aboutUs_last[0], expanded: false };
    });
  }

  toggleDescription(item: AboutUsItem): void {
    item.expanded = !item.expanded;
  }
}

