import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CategoriesFormData } from '../interfaces/categories-form-data';
import { GlobalVariables } from '../global-variables';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private _categories:any = [];
  categoriesSubject:Subject<any> = new Subject<any>();
  categories = this.categoriesSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { 
    this.getCategories();
  }

  // Get
  getCategories = () => {
    this.http.get(`${GlobalVariables.APIBaseURL}/categories`).subscribe(data => {
      this._categories = data;
      this.categoriesSubject.next(this._categories);
    });
  }
  
  // Post
  addCategory = (categoryData:CategoriesFormData) => {
    let body = {
      name: categoryData.name,
      color: categoryData.color
    };

    return this.http.post(`${GlobalVariables.APIBaseURL}/categories`, body);
  }

  // Put
  editCategory = (categoryData:CategoriesFormData) => {
    let body = {
      name: categoryData.name,
      color: categoryData.color
    }

    return this.http.put(`${GlobalVariables.APIBaseURL}/categories/${categoryData.id}`, body);
  }

  // Delete
  deleteCategory = (id:any) => {
    return this.http.delete(`${GlobalVariables.APIBaseURL}/categories/${id}`);
  }
}
