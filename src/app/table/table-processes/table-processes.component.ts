import { Component, OnInit, Input } from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
//   { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
//   { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
//   { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
//   { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
//   { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
//   { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
//   { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
// ];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'table-processes',
  styleUrls: ['table-processes.component.css'],
  templateUrl: 'table-processes.component.html',
})
export class TableProcesses implements OnInit {
  dataSource = [];

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // primer
  displayedColumns: string[] = ['name', 'arrivalTime', 'executeTime'];

  // segundo
  displayedColumns2: string[] = [
    'nombre',
    'tiempo de llegada',
    'tiempo de ejecucion',
    'tiempo comienzo',
    'tiempo finalizacion',
    'tiempo de estancia',
  ];

  ngOnInit() {
    //this.dataSource = [{ arrivalTime: '1', executeTime: '1', name: '1' }];
  }

  populate(arrayP: any[]) {
    this.dataSource = arrayP;
  }
}
