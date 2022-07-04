import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { BehaviorService } from '../services/behavior.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-behaviors',
  templateUrl: './behaviors.component.html',
  styleUrls: ['./behaviors.component.css']
})
export class BehaviorsComponent implements OnInit {
  displayedColumns: string[] = [ 'expectedValue', 'behavior', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private behaviorService: BehaviorService) { }

  ngOnInit(): void {
    this.getAllBehaviors();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '50%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save') {
        this.getAllBehaviors();
      }
    })
  }

  getAllBehaviors() {
    this.behaviorService.getBehavior()
    .subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) => {
        alert('Error caricamento comportamenti')
      }
    })
  }

  editBehavior(row : any) {
    this.dialog.open(DialogComponent,{
      width: '50%',
      data:row
    }).afterClosed().subscribe(val=>{
      if(val === 'update') {
        this.getAllBehaviors();
      }
    })
  }

  deleteBehavior(id: number){
    this.behaviorService.deleteBehavior(id).
    subscribe({
      next:(res)=>{
        alert('Comportamento eliminato con successo');
        this.getAllBehaviors();
      },
      error:()=>{
        alert('Errore impossibile eliminare')
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
