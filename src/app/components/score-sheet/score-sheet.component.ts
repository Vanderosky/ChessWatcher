import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-score-sheet',
  templateUrl: './score-sheet.component.html',
  styleUrls: ['./score-sheet.component.css']
})
export class ScoreSheetComponent implements OnInit, OnChanges {
  @Input() movesInNotation: any = [];

  public tableData: rowInTable[] = [];

  displayedColumns: string[] = ['position', 'pieces-white', 'pieces-black'];

  constructor() {}


  ngOnInit(): void {}

  ngOnChanges(): void {
    this.transformDataToTable();
  }

  transformDataToTable(): void {
    const newTableData = [];
    const length = this.movesInNotation.length;

    for (let index = 0; index < length; index += 2) {
      if (index < length - 1) {
        newTableData.push({
          row: index + 1,
          white: this.movesInNotation[index],
          black: this.movesInNotation[index + 1],
        })
      }
      else {
        newTableData.push({
          row: index,
          white: this.movesInNotation[index],
          black: '',
        })
      }
    }

    this.tableData = newTableData;
  }
}

interface rowInTable {
  row: number,
  white: string,
  black: string,
}