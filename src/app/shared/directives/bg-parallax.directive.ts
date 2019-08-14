import { Directive, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { fromEvent, Observable, Subscription } from "rxjs";
import { throttleTime } from "rxjs/operators";

@Directive({
  selector: '[appBgParallax]'
})
export class BgParallaxDirective implements OnInit, OnDestroy {

  ratio: number = 0.1;

  mouseMove$: Observable<any>;
  mouseMoveSub: Subscription;

  constructor(private el: ElementRef) {
    this.mouseMove$ = fromEvent(el.nativeElement, 'mousemove')
      .pipe(throttleTime(5));
  }

  ngOnInit(): void {
    this.mouseMoveSub = this.mouseMove$
      .subscribe(event => {
        this.el.nativeElement.style.backgroundPositionX = -event.offsetX * this.ratio + 'px';
        this.el.nativeElement.style.backgroundPositionY = -event.offsetY * this.ratio + 'px';
      });
  }

  ngOnDestroy(): void {
    this.mouseMoveSub.unsubscribe();
  }
}
