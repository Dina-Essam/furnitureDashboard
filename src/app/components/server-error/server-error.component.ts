import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
