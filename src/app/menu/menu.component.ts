import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AppService } from '../app.service';
import { Category } from '../app.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  categoryButtons = signal<Category[]>([])
  activeButton = signal(0)
  error = signal('')
  loading = signal(false)

  private appService = inject(AppService)
  private destroyRef = inject(DestroyRef)


  ngOnInit(): void {
    this.loading.set(true)
    const subscription = this.appService.lista_categorias()
    .pipe(
      tap(categories => this.categoryButtons.set(categories)),
      tap(categories => this.loading.set(false),),
      switchMap((categories) => {
        return this.appService.lista_marcas(categories[0].idMenu)
      })
    )
    .subscribe({
      next: brands => this.appService.setMarcas(brands),
      complete: () => this.loading.set(false),
      error: (e) => {
        this.error.set(e)
        this.loading.set(false)
      }
    })

    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }

  lista_marcas(index: number, idMenu: number) {
    this.activeButton.set(index)
    const subscription = this.appService.lista_marcas(idMenu).subscribe({
      next: brands => this.appService.setMarcas(brands),
      complete: () => this.loading.set(false),
      error: (e) => {
        this.error.set(e)
        this.loading.set(false)
      }
    })
    this.destroyRef.onDestroy(() => subscription.unsubscribe())
  }
}
