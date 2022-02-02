import { trigger, style, animate, transition, query } from '@angular/animations';

export const slideInAnimation =
trigger('routeAnimations', [
  transition('* <=> *', [
    // Set a default  style for enter and leave
    query(':enter, :leave',  [
      style({
        opacity: 0,
        transform: 'scale(0) translateY(100%)',
      }),
    ], {optional: true}),
    // Animate the new page in
    query(':enter',  [
      animate('500ms ease', style({
        opacity: 1,
        transform: 'scale(1) translateY(0)'
      })
      ),
    ], {optional: true})
  ]),
]);
