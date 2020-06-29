import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AvrEntityGenerationDialogComponent } from "../avr-entity-generation-dialog/avr-entity-generation-dialog.component";

@Component({
  selector: 'avr-entity-generation',
  templateUrl: './avr-entity-generation.component.html',
  styleUrls: ['./avr-entity-generation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvrEntityGenerationComponent implements OnInit {

  @Input()  name: string = '';
  @Input()  units: any[] = [];
  @Output() onEntityGenerated: EventEmitter<any> = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.units;

    this.dialog.open(AvrEntityGenerationDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(value => {
        if (value) {
          this.onEntityGenerated.emit(value);
        }
      });
  }
}
