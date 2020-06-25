import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog/dialog-overview-example-dialog'; 

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public dialog: MatDialog) {}

  animal: string;
  name: string;

  srtAlgArray = [
 
    {
      tiempoRestante: 5,
      tiempoEstimado: 5
    },
    {
      tiempoRestante: 10,
      tiempoEstimado: 10
    },
    {
      tiempoRestante: 3,
      tiempoEstimado: 3
    }
  ]

  add() {
    const arrayWithoutPriority = [];

    // Without priority

    // Adding elements
    arrayWithoutPriority.push(3);
    arrayWithoutPriority.push(7);
    arrayWithoutPriority.push(9);
    arrayWithoutPriority.push(15);

    // Removing elements

    console.log(arrayWithoutPriority);
    arrayWithoutPriority.shift();
    console.log(arrayWithoutPriority);
    arrayWithoutPriority.shift();
    console.log(arrayWithoutPriority);
    arrayWithoutPriority.shift();
    console.log(arrayWithoutPriority);
    arrayWithoutPriority.shift();

    // With priority

    const arrayWithPriority = [];

    arrayWithPriority.push({ tiempoServicio: Math.floor(Math.random() * 11), priority: 3 });
    arrayWithPriority.push({ tiempoServicio: Math.floor(Math.random() * 11), priority: 1 });
    arrayWithPriority.push({ tiempoServicio: Math.floor(Math.random() * 11), priority: 5 });
    arrayWithPriority.push({ tiempoServicio: Math.floor(Math.random() * 11), priority: 10 });

    let arrayWithPrioritySorted = arrayWithPriority.sort((a, b) => {
      return a.priority - b.priority;
    });
    console.log(arrayWithPrioritySorted);
  }

  srtAlg() {
    console.log(this.srtAlgArray);
    let srtAlgArraySorted = this.srtAlgArray.sort((a, b) => {
      return a.tiempoRestante - b.tiempoRestante;
    });
    console.log(srtAlgArraySorted);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  procesador() {

  }

}


