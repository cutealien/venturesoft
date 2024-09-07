import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  data = [
    {benefit: 'Instant Coupons', noLink: 'task_alt', link: 'task_alt'},
    {benefit: 'Full acces to Visa Savings Egde Benefits', noLink: '', link: 'task_alt'},
    {benefit: 'Cashback Tracking', noLink: '', link: 'task_alt'},
    {benefit: 'Location search', noLink: '', link: 'task_alt'},
    {benefit: 'Cashback offers', noLink: '', link: 'task_alt'}
  ]
  tableColumns = ['benefit', 'noLink', 'link']
}
