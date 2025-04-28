import {Component, OnInit} from '@angular/core';
import {AboutUsItem} from '../models/about-us.model';
import {AboutUsService} from '../services/about-us.service';
import {CommonModule, NgForOf, SlicePipe} from '@angular/common';

@Component({
  imports: [
    SlicePipe,
    NgForOf,
    CommonModule
  ],
  selector: 'app-about-us',
  standalone: true,
  styleUrl: './about-us.component.css',
  templateUrl: './about-us.component.html'
})

export class AboutUsComponent implements OnInit {
  aboutIntro: AboutUsItem[] = [];
  aboutGrid: AboutUsItem[] = [];
  aboutLast: AboutUsItem = {} as AboutUsItem;


  constructor(private aboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this.aboutUsService.getAboutUsData().then(data => {
      this.aboutIntro = data.aboutUs_intro.map((item: AboutUsItem) => ({ ...item, expanded: false }));
      this.aboutGrid = data.aboutUs_grid.map((item: AboutUsItem) => ({ ...item, expanded: false }));
      this.aboutLast = { ...data.aboutUs_last[0], expanded: false };
    });
  }

  toggleDescription(item: AboutUsItem): void {
    item.expanded = !item.expanded;
  }
}
