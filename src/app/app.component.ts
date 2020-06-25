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

  processName: string;
  processArrivalTime: number;
  processExecuteTime: number;

  processes = [];
  finishedProcesses = [];

  addProcess(){
    this.processes.push({name: this.processName, arrivalTime: this.processArrivalTime, executeTime: this.processExecuteTime});
    console.log(this.processes);
  }


  fifo(){
    let time = 0;

    console.log('Ordeno los procesos por orden de llegada');
    let processesSorted = this.processes.sort(function(a,b){
      var arrivalTimeA = a.arrivalTime, arrivalTimeB = b.arrivalTime
      if (arrivalTimeA < arrivalTimeB) return -1;
      if (arrivalTimeA > arrivalTimeB) return 1;
      return 0;
    });
    console.log(processesSorted);

    let processActual;
    let processActualExecuteTime;
    let finishProcess = true;

    console.log('Inicio el proceso');
    while(finishProcess){
      console.log('Pregunto si hay un proceso actual');
      if(processActual == null){
        let firstProcess = processesSorted[0];
        processActual = ({name: firstProcess.name, arrivalTime: firstProcess.arrivalTime, executeTime: firstProcess.executeTime, startTime: time, endingTime: null, stayTime: null})
        processActualExecuteTime = processActual.executeTime;
        console.log('No hay un proceso actual, asigno el primero');
        console.log(processActual);
        console.log('Elimino el proceso tomado anteriormente');
        processesSorted.splice(processesSorted.indexOf(processesSorted[0]), 1);
        console.log(processesSorted);
      }
      //this.finishedProcesses.push({name: processActual.name, arrivalTime: processActual.arrivalTime, executeTime: processActual.executeTime, startTime: time, endingTime: null, stayTime: null});
      
      console.log('Resto el tiempo de ejecución del primero');
      processActualExecuteTime = processActualExecuteTime - 1;

      time = time + 1;

      if(processActualExecuteTime === 0){
        this.finishedProcesses.push({name: processActual.name, arrivalTime: processActual.arrivalTime, executeTime: processActual.executeTime, startTime: processActual.startTime, endingTime: time, stayTime: time - processActual.arrivalTime});
        console.log(this.finishedProcesses);
        processActual = null;
        if(processesSorted.length === 0){
          finishProcess = false;
        } 
      }
    }
  }

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

  srtAlg() {
    
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


