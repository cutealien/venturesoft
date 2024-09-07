import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Brand, BrandResponse, Category, CategoryResponse } from './app.model';
import { catchError, map, tap, throwError } from 'rxjs';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  private http = inject(HttpClient)
  private apiUrl = environment.apiUrl

  categories = signal<Category[]>([])
  brands = signal<Brand[]>([])
  showAll = signal(false)


  constructor() { }

  lista_categorias() {
    const url = this.apiUrl + 'Categorias'
    return this.http.get<CategoryResponse>(url)
    .pipe(
      map(data => data.menuItems),
      tap(categories => this.categories.set(categories)),
      catchError(error => {
        return throwError(() => new Error('Something went wrong loading categories. Try again later.'))
      })
    )
  }

  lista_marcas(idMenu: number) {
    const url = this.apiUrl + 'Marcas'
    return this.http.get<BrandResponse>(url, {
      params: {
        idMenu: idMenu.toString()
      }
    })
    .pipe(
      map(data => data.menuItems),
      tap(menuItems => this.showAll.set(false)),
      catchError(error => {
        return throwError(() => new Error('Something went wrong loading brands. Try again later.'))
      })
    )
  }

  sortBrands(value: 'nameA' | 'descriptionA' | 'nameD' | 'descriptionD') {
    switch (value) {
      case 'nameA':
        this.brands.set([...this.brands().sort(this.sortByNameAscendent)])
        break
      case 'nameD':
        this.brands.set([...this.brands().sort(this.sortByNameDescendent)])
        break
      case 'descriptionA':
        this.brands.set([...this.brands().sort(this.sortByDescriptionAscendent)])
        break
      case 'descriptionD':
        this.brands.set([...this.brands().sort(this.sortByDescriptionDescendent)])
        break
      default:
    }
  }

  sortByNameAscendent(a: Brand, b: Brand) {
    const nameA = a.nombreMarca.toUpperCase()
    const nameB = b.nombreMarca.toUpperCase()
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }

  sortByNameDescendent(a: Brand, b: Brand) {
    const nameA = a.nombreMarca.toUpperCase()
    const nameB = b.nombreMarca.toUpperCase()
    if (nameA > nameB) {
      return -1;
    }
    if (nameA < nameB) {
      return 1;
    }
    return 0;
  }

  sortByDescriptionAscendent (a: Brand, b: Brand) {
    const descriptionA = a['descripción'].toUpperCase()
    const descriptionB = b['descripción'].toUpperCase()
    if (descriptionA < descriptionB) {
      return -1;
    }
    if (descriptionA > descriptionB) {
      return 1;
    }
    return 0;
  }

  sortByDescriptionDescendent (a: Brand, b: Brand) {
    const descriptionA = a['descripción'].toUpperCase()
    const descriptionB = b['descripción'].toUpperCase()
    if (descriptionA > descriptionB) {
      return -1;
    }
    if (descriptionA < descriptionB) {
      return 1;
    }
    return 0;
  }

  setMarcas(marcas: Brand[]) {
    this.brands.set(marcas)
  }

  showAllBrands() {
    this.showAll.set(true)
  }
}
