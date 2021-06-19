import { Injectable, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ErrorDialogComponent } from './errordialog.component';

@Injectable()
export class ErrorDialogService {
    public isDialogOpen: Boolean = false;
    dialogRef!: MatDialogRef<ErrorDialogComponent, any>;
    constructor(public dialog: MatDialog , private ngZone: NgZone) { }

    openDialog(data: any): any {
        if (this.isDialogOpen) {
            return false;
        }
        this.isDialogOpen = true;
        this.dialogRef = this.dialog.open(ErrorDialogComponent, {
            width: '300px',
            data: data,
            panelClass: 'myapp-no-padding-dialog'
        });

        this.dialogRef.afterClosed().subscribe((result: any) => {
            console.log('The dialog was closed');
            this.isDialogOpen = false;
        });
        
    }
    onClick(): void {
        this.ngZone.run(() => {
          this.dialogRef.close();
          this.isDialogOpen = false;
        });
    }
}