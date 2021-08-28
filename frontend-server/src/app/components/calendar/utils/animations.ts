import { animate, state, style, transition, trigger } from "@angular/animations";

export const fadeOutAnimation = trigger('fadeOut', [
  state('void', style({
    opacity: '0',
    width: '0',
    display: 'none'
  })),
  transition('* => void', animate('400ms ease-in'))
]);
