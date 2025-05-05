import {Component, inject, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {DataService} from '../data.service';
import {RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {Tour} from '../types';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-tour-list',
  imports: [MatCell, MatHeaderCell, MatColumnDef, MatSort, MatTable, MatPaginator, MatButton, MatHeaderRow, MatRow, RouterLink, MatHeaderCellDef, MatCellDef, MatRowDef, MatHeaderRowDef, DatePipe],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.css'
})
export class TourListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Tour>;
  dataSource = new MatTableDataSource<Tour>();

  displayedColumns = ['name','startDate', 'endDate', 'hikes', 'rating', 'detailButton'];

  dataService: DataService = inject(DataService)

  ngAfterViewInit(): void {
    this.dataService.getAllTours().subscribe({
      next: tours => {
        this.dataSource.data = tours;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        console.log('Fetching completed!');
      }
    });
  }

  /* // Actions
  edit(element: any): void {}
  delete(element: any): void {}
  */
}
