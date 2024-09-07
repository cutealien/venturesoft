import { Component } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HeaderComponent } from "./header/header.component";
import { TableComponent } from "./table/table.component";
import { MenuComponent } from "./menu/menu.component";
import { MarcaComponent } from "./marca/marca.component";
import { FooterComponent } from "./footer/footer.component";
import { DetalleComponent } from "./detalle/detalle.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule, HeaderComponent, TableComponent, MenuComponent, MarcaComponent, FooterComponent, DetalleComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
