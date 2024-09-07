import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { AppService } from '../app.service';
import { switchMap, takeUntil, takeWhile, tap } from 'rxjs';
import { Brand } from '../app.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export class DetalleComponent {

  appService = inject(AppService)
  brands = signal<Brand[]>([])
  categories = computed(() => {
    return this.appService.categories().slice(0,4)
  })
  error = signal('')
  private destroyRef = inject(DestroyRef)

  constructor() {
    effect(() => {
      if(this.categories().length > 0) {
        let brands: Brand[] = []
        const subscription = this.appService.lista_marcas(this.categories()[0].idMenu)
        .pipe(
          switchMap(b => {
            brands.push(b[2])
            return this.appService.lista_marcas(this.categories()[1].idMenu)
          }),
          switchMap(b => {
            brands.push(b[3])
            return this.appService.lista_marcas(this.categories()[2].idMenu)
          }),
          switchMap(b => {
            brands.push(b[0])
            return this.appService.lista_marcas(this.categories()[3].idMenu)
          })
        )
        .subscribe({
          next: b => {
            brands.push(b[0])
            this.brands.set(brands)
          },
          complete: () => console.log('completed'),
          error: e => this.error.set(e)
        })

        this.destroyRef.onDestroy(() => subscription.unsubscribe())
      }
    })
  }
}
