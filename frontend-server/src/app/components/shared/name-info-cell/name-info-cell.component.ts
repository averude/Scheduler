import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '[name-info-cell]',
  templateUrl: './name-info-cell.component.html',
  styleUrls: ['./name-info-cell.component.css']
})
export class NameInfoCellComponent implements OnInit {

  @Input() name: string;
  @Input() info: string;

  @Input() isEditable: boolean;
  @Input() isHighlighted: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
