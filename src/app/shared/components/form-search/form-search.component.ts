import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-search',
  template: `
    <input
    #inputSearch
    autofocus
    type="text"
    class="form-control-lg"
    placeholder="Search..."
    />
  `,

  styles: ['input {width:100%}'],
})
export class FormSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
