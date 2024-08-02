import { Component, OnInit } from '@angular/core';
import { Category } from './category';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../services/category/category.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule,RouterLink,CategoryComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
  providers : [CategoryService]
})
export class CategoryComponent implements OnInit{

 
  title = "Kategoriler";
  categories : Category[] = [];

  constructor(private api : CategoryService){}

  ngOnInit(): void {
    this.api.getCategories().subscribe( data => {
      this.categories = data;
    });
  }
}
