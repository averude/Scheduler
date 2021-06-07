import { Directive, OnInit } from "@angular/core";
import { BasicDTO } from "../../../model/dto/basic-dto";
import { MatDialogRef } from "@angular/material/dialog";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { IdEntity } from "../../../model/interface/id-entity";

@Directive()
export abstract class DtoDialogBaseComponent<P extends IdEntity, C> implements OnInit {

  operation: string;

  constructor(public dto: BasicDTO<P, C>,
              protected dialogRef: MatDialogRef<any>) {
  }

  ngOnInit() {
    this.dto = this.dto ? this.dto : this.newDto;
    this.operation = this.dto ? 'Edit' : 'Add';
  }

  addChild() {
    const child = <C> {};
    this.configureChild(child);
    this.dto.collection.push(child);
  }

  configureChild(child: C): void {

  }

  drop(event: CdkDragDrop<C[]>) {

  }

  delete(child: C) {
    const sequence = this.dto.collection;
    const index = sequence.findIndex(value => value === child);
    sequence.splice(index, 1);
    this.afterDelete(index, sequence);
  }

  afterDelete(index: number, collection: C[]): void {

  }

  compare(a: number, b: number): boolean {
    return a === b;
  }

  compareIdEntity(a: IdEntity, b: IdEntity): boolean {
    return (a && b) && (a.id === b.id);
  }

  get newDto(): BasicDTO<P, C> {
    const dto = new BasicDTO<P, C>();
    dto.parent = <P> {};
    dto.collection = [];
    return dto;
  }

  submit() {
    this.dialogRef.close(this.dto);
  }

  close() {
    this.dialogRef.close();
  }
}
