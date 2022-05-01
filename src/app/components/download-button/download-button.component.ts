import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrls: ['./download-button.component.css']
})
export class DownloadButtonComponent implements OnInit {
  @Input() movesInNotation: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  downloadPgn() {
    let aggregatedMovesInNotation = '';
    this.movesInNotation.forEach(element => {
      aggregatedMovesInNotation += element;
      aggregatedMovesInNotation += ' ';
    });

    var link = document.createElement('a');
    link.download = 'PGN';
    link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(aggregatedMovesInNotation)
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
