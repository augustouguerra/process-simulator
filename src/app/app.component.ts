import { Component, Inject, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from './dialog/dialog-overview-example-dialog'; 
import { TableProcesses } from './table/table-processes/table-processes.component';
import { MatTable } from '@angular/material/table';

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

  @ViewChild('matTableViewChild') matTableViewChild: MatTable<any>;
  @ViewChild('matTableFinishedViewChild') matTableFinishedViewChild: MatTable<any>;
  
  constructor(
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  animal: string;
  name: string;

  array = [];

  processName: string;
  processArrivalTime: number;
  processExecuteTime: number;
  quantum: number;

  processes = [];
  finishedProcesses = [];

  dataSource = [];
  dataSourceFinished = [];
  displayedColumns: string[] = ['name', 'arrivalTime', 'executeTime'];
  displayedColumnsFinished: string[] = ['name', 'arrivalTime', 'executeTime', 'startTime', 'endingTime', 'stayTime', 'stayExecute'];

  addProcess(){
    
    this.processes.push({name: this.processName, arrivalTime: this.processArrivalTime, executeTime: this.processExecuteTime});
    console.log(this.processes);
    //this.elemntRef.populate(this.processes);

    this.dataSource = this.processes;

    this.matTableViewChild.renderRows();
    //this.changeDetectorRefs.detectChanges();
  }


  fifo(){
    this.finishedProcesses = [];
    let time = 0;

    console.log('Ordeno los procesos por orden de llegada');
    let processesSorted = [];
    this.processes.forEach((proceso)=>{
      processesSorted.push(proceso);
    });
    processesSorted = processesSorted.sort(function(a,b){
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
    this.dataSourceFinished = this.finishedProcesses;
    this.matTableFinishedViewChild.renderRows();
  }

  roundRobin(){
    this.finishedProcesses = [];
    let time = 0;
    let quantumAcumulated = 0;

    console.log('Ordeno los procesos por tiempo de llegada');
    let procesosOrdenados = [];
    this.processes.forEach((proceso)=>{
      procesosOrdenados.push(proceso);
    });
    procesosOrdenados = procesosOrdenados.sort(function(a,b){
      var arrivalTimeA = a.arrivalTime, arrivalTimeB = b.arrivalTime
      if (arrivalTimeA < arrivalTimeB) return -1;
      if (arrivalTimeA > arrivalTimeB) return 1;
      return 0;
    });
    console.log(procesosOrdenados);

    console.log('Le agrego a los procesos el tiempo remanente');
    procesosOrdenados.forEach((proceso)=>{
      proceso['remainingExecuteTime'] = proceso.executeTime;
      proceso['startTime'] = null;
      proceso['endingTime'] = null;
      proceso['stayTime'] = null;
    });
    console.log(procesosOrdenados);

    let procesoActual;
    let algoritmo = true;

    console.log("Empiezo el algoritmo");
    while(algoritmo){
      console.log("Evaluo si necesito tomar un nuevo proceso");
      if(procesoActual == null){
        console.log("Tomo un nuevo proceso");
        procesoActual = procesosOrdenados[0];
        //startTime: time, endingTime: null, stayTime: null}
        if(procesoActual.startTime == null){
          procesoActual['startTime'] = time;
        }
        console.log(procesoActual);
      }

      console.log("Actualizo las variables");
      time = time + 1;
      quantumAcumulated = quantumAcumulated + 1;
      console.log(time);
      console.log(quantumAcumulated);

      console.log("Evaluo si hay un proceso actual en ejecución");
      if(procesoActual != null){
        console.log("Resto el tiempo restante del proceso");
        procesoActual.remainingExecuteTime = procesoActual.remainingExecuteTime - 1;
        console.log(procesoActual.remainingExecuteTime);

        console.log("Evaluo si el proceso finalizó");
        if(procesoActual.remainingExecuteTime === 0){
          console.log("Elimino el proceso");
          procesosOrdenados.shift();
          console.log(procesosOrdenados);
          console.log("Agrego el proceso a la lista de finalizados");
          this.finishedProcesses.push({name: procesoActual.name, arrivalTime: procesoActual.arrivalTime, executeTime: procesoActual.executeTime, startTime: procesoActual.startTime, endingTime: time, stayTime: time - procesoActual.arrivalTime});
          console.log(this.finishedProcesses);
          procesoActual = null;
          console.log("Reseteo el quantum acumulado");
          quantumAcumulated = 0;
          console.log("Evaluo si no hay más procesos");
          if(procesosOrdenados.length === 0){
            console.log("Finalizo el algoritmo");
            algoritmo = false;
          } 
        }
      }
      console.log("Evaluo si terminó el quantum");
      console.log("Quantum: " + this.quantum);
      if(quantumAcumulated == this.quantum){
        console.log("Reseteo el quantum acumulado");
        quantumAcumulated = 0;
        console.log("Evaluo si hay un proceso en ejecución");
        if(procesoActual != null){
          console.log("Muevo el proceso al final de la cola");
          //ordeno el array
          procesosOrdenados.shift();
          console.log("procesos: " + procesosOrdenados);
          procesosOrdenados.forEach((proceso)=>{
            console.log(proceso);
          });
          
          let procesosReordenados = [];
          for(let i = 0; i < procesosOrdenados.length; i++){
            if(procesosOrdenados[i].arrivalTime <= time){
              procesosReordenados.push(procesosOrdenados[i]);
            }
          }
          procesosReordenados.push(procesoActual);

          for(let i = 0; i < procesosOrdenados.length; i++){
            if(procesosOrdenados[i].arrivalTime > time){
              procesosReordenados.push(procesosOrdenados[i]);
            }
          }

          procesosOrdenados = procesosReordenados;
          
        }
        console.log("procesos: " + procesosOrdenados);
        procesosOrdenados.forEach((proceso)=>{
          console.log(proceso);
        });
        procesoActual = null;
      }
    }
    this.dataSourceFinished = this.finishedProcesses;
    this.matTableFinishedViewChild.renderRows();
  }

  spn(){
    this.finishedProcesses = [];
    let time = 0;

    console.log('Ordeno los procesos por tiempo de llegada');
    let procesosOrdenados = [];
    this.processes.forEach((proceso)=>{
      procesosOrdenados.push(proceso);
    });
    procesosOrdenados = procesosOrdenados.sort(function(a,b){
      var arrivalTimeA = a.arrivalTime, arrivalTimeB = b.arrivalTime
      if (arrivalTimeA < arrivalTimeB) return -1;
      if (arrivalTimeA > arrivalTimeB) return 1;
      return 0;
    });
    console.log(procesosOrdenados);


    let continuarAlgoritmo = true;
    let procesoActual = null;
    let processRemainingTime;

    while(continuarAlgoritmo){

      if(procesoActual == null){
        procesoActual = procesosOrdenados[0];
        procesoActual['startTime'] = time;
        procesoActual['endingTime'] = null;
        procesoActual['stayTime'] = null;
        processRemainingTime = procesoActual.executeTime;
      }

      time = time + 1;
      console.log("Time: " + time);

      processRemainingTime = processRemainingTime - 1;
      console.log("Remaining time: " + processRemainingTime);

      console.log("Evaluo si el proceso finalizó");
        if(processRemainingTime === 0){
          console.log("Elimino el proceso");
          procesosOrdenados.shift();
          console.log(procesosOrdenados);
          console.log("Agrego el proceso a la lista de finalizados");
          this.finishedProcesses.push({name: procesoActual.name, arrivalTime: procesoActual.arrivalTime, executeTime: procesoActual.executeTime, startTime: procesoActual.startTime, endingTime: time, stayTime: time - procesoActual.arrivalTime});
          console.log(this.finishedProcesses);
          procesoActual = null;
          console.log("Evaluo si no hay más procesos");
          if(procesosOrdenados.length === 0){
            console.log("Finalizo el algoritmo");
            continuarAlgoritmo = false;
          } else {
            console.log("Ordeno la cola de procesos");
            let procesosEnCola = [];
            let procesosSinLlegar = [];
            procesosOrdenados.forEach((proceso)=>{
              if(proceso.arrivalTime <= time){
                procesosEnCola.push(proceso);
              } else {
                procesosSinLlegar.push(proceso);
              }
            });
            console.log(procesosEnCola);
            console.log(procesosSinLlegar);
            let procesosEnColaOrdenados = procesosEnCola.sort(function(a,b){
              var executeTimeA = a.executeTime, executeTimeB = b.executeTime
              if (executeTimeA < executeTimeB) return -1;
              if (executeTimeA > executeTimeB) return 1;
              return 0;
            });
            procesosOrdenados = [];
            procesosEnColaOrdenados.forEach((proceso)=>{
              procesosOrdenados.push(proceso);
            });
            procesosSinLlegar.forEach((proceso)=>{
              procesosOrdenados.push(proceso);
            });
            console.log(procesosOrdenados);
          }
        }


    }
    this.dataSourceFinished = this.finishedProcesses;
    this.matTableFinishedViewChild.renderRows();
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

    arrayWithPriority.push({ tiempoServicio: Math.floor(Math.random() * 11), priority: 3 });
    arrayWithPriority.push({ tiempoServicio: Math.floor(Math.random() * 11), priority: 1 });
    arrayWithPriority.push({ tiempoServicio: Math.floor(Math.random() * 11), priority: 5 });
    arrayWithPriority.push({ tiempoServicio: Math.floor(Math.random() * 11), priority: 10 });

    let arrayWithPrioritySorted = arrayWithPriority.sort((a, b) => {
      return a.priority - b.priority;
    });
    console.log(arrayWithPrioritySorted);
  }

  /*
  srtAlg() {
    console.log(this.srtAlgArray);
    let srtAlgArraySorted = this.srtAlgArray.sort((a, b) => {
      return a.tiempoRestante - b.tiempoRestante;
    });
    console.log(srtAlgArraySorted);
  }
  */

  /*
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
  */



}


