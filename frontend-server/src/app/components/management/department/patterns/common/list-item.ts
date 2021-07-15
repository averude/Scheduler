import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { IdEntity } from "../../../../../model/interface/id-entity";

@Directive()
export abstract class ListItem<T> {
  @Input() item: T;
  @Output() onDelete: EventEmitter<T> = new EventEmitter();

  delete() {
    this.onDelete.emit(this.item);
  }

  compareIdEntity(a: IdEntity, b: IdEntity): boolean {
    return (a && b) && (a.id === b.id);
  }
}
