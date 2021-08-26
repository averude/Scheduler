export class Options {
  selectionEnabled?:  boolean;
  multipleSelect?:    boolean;
  showSumColumns?:    boolean;
  distinctByColor?:   boolean;
  groupable?:         boolean;
  trackByFn?:         (value, index) => any;
  groupIsShownFn?:    (group) => boolean;
}
