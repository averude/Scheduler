import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appEditableRow]',
  exportAs: 'editableRow'
})
export class EditableRowDirective {

  public isEditable = false;

  constructor() {}

  @HostListener('dblclick')
  onDoubleClick() {
    this.isEditable = true;
  }

  @HostListener('document: keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isEditable = false;
    }
  }
}
