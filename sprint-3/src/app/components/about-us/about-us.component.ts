import { Component, OnInit } from '@angular/core';
import { AboutUsService } from '../../services/about-us.service';
import { AboutUsItem } from '../../models/about-us.model'; // Ajusta la ruta si es necesario

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  aboutIntro: AboutUsItem[] = [];
  aboutGrid: AboutUsItem[] = [];
  aboutLast!: AboutUsItem;

  constructor(private aboutUsService: AboutUsService) {}

  ngOnInit(): void {
    this.aboutUsService.getData().subscribe(data => {
      this.aboutIntro = data.aboutUs_intro.map((item: AboutUsItem) => ({ ...item, expanded: false }));
      this.aboutGrid = data.aboutUs_grid.map((item: AboutUsItem) => ({ ...item, expanded: false }));
      this.aboutLast = { ...data.aboutUs_last[0], expanded: false };
    });
  }

  toggleDescription(item: AboutUsItem): void {
    item.expanded = !item.expanded;
  }
}
