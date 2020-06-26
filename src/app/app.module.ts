import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DialogOverviewExampleDialog } from './dialog/dialog-overview-example-dialog';
import { TableProcesses } from './table/table-processes/table-processes.component';
import { TableFinishedProcesses } from './table/table-finished-processes/table-finished-processes.component';


// Modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
    AppComponent,
    DialogOverviewExampleDialog,
    TableProcesses,
    TableFinishedProcesses
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
