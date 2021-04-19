import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {CoordEditorComponent} from 'src/app/coord-editor/coord-editor.component';
import {CoordSystemComponent} from 'src/app/coord-system/coord-system.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'TriangleChecker';
  @ViewChild(CoordSystemComponent) canvas;
  @ViewChild(CoordEditorComponent) form;


  constructor() {}


  public setPoints() {
    this.form.setPoints(this.canvas.points);
    this.form.updateType(this.canvas.points);
  }

  public update() {
    this.canvas.setPoints(this.form.getPoints());
  }

  public resize() {
    this.canvas.updateBoard();
  }


  ngAfterViewInit() {
    let init = [[2, 2], [10, 3], [3, 8]];
    this.canvas.setPoints(init);
    this.form.setPoints(init);
  }

}
