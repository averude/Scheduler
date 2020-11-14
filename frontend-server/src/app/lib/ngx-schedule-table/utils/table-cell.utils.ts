import { ElementRef } from "@angular/core";

export function toggleClass(elementRef: ElementRef, className: string) {
  elementRef.nativeElement.classList.toggle(className);
}
