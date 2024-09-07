import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppService } from '../app.service';
import { Brand } from '../app.model';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-marca',
  standalone: true,
  imports: [MatIconModule, MatSelectModule, MatInputModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatMenuModule],
  templateUrl: './marca.component.html',
  styleUrl: './marca.component.scss'
})
export class MarcaComponent {

  activeView = signal<'gallery' | 'list'>('gallery')

  private appService = inject(AppService)

  totalBrands = computed(() => this.appService.brands().length)
  showAll = computed(() => this.appService.showAll())

  brands = computed(() => {
    if (this.showAll()) {
      return this.appService.brands()
    }
    return this.appService.brands().slice(0,7)
  })

  changeView(view: 'gallery' | 'list'){
    this.activeView.set(view)
  }

  showAllBrands() {
    this.appService.showAllBrands()
  }

  sortBy(value: 'nameA' | 'descriptionA' | 'nameD' | 'descriptionD') {
    this.appService.sortBrands(value)
  }
}
