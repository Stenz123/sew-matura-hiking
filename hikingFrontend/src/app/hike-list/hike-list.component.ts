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
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {Hike, TourDetail} from '../types';
import {DatePipe} from '@angular/common';
@Component({
  selector: 'app-hike-list',
  imports: [MatCell, MatHeaderCell, MatColumnDef, MatSort, MatTable, MatPaginator, MatButton, MatHeaderRow, MatRow, RouterLink, MatHeaderCellDef, MatCellDef, MatRowDef, MatHeaderRowDef, DatePipe],
  templateUrl: './hike-list.component.html',
  styleUrl: './hike-list.component.css'
})
export class HikeListComponent {
  router : Router = inject(Router);
  route : ActivatedRoute = inject(ActivatedRoute);
  dataService = inject(DataService)

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Hike>;
  dataSource = new MatTableDataSource<Hike>();

  displayedColumns = ['title','difficulty', 'length', 'region', 'detailButton'];

  tour: TourDetail | null = null

  ngAfterViewInit(): void {
    const id = Number(this.route.snapshot.params['id']);

    this.dataService.getTourDetail(id).subscribe({
      next: tour => {
        this.tour = tour
        this.dataSource.data = tour.hikes;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: err => {
        this.router.navigate(['/not-found'])
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
