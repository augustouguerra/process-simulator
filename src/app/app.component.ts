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

    arrayWithPriority.push({ value: 10, priority: 3 });
    arrayWithPriority.push({ value: 15, priority: 1 });
    arrayWithPriority.push({ value: 13, priority: 5 });
    arrayWithPriority.push({ value: 11, priority: 10 });

    let arrayWithPrioritySorted = arrayWithPriority.sort((a, b) => {
      return a.priority - b.priority;
    });
    console.log(arrayWithPrioritySorted);
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
}


