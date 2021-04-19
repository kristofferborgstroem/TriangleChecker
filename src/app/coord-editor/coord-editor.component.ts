import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-coord-editor',
  templateUrl: './coord-editor.component.html',
  styleUrls: ['./coord-editor.component.css']
})
export class CoordEditorComponent implements OnInit {

  constructor() { }


  public coordForm = new FormGroup({
    pointA: new FormGroup({
      X: new FormControl(2),
      Y: new FormControl(2),
    }),
    pointB: new FormGroup({
      X: new FormControl(10),
      Y: new FormControl(3),
    }),
    pointC: new FormGroup({
      X: new FormControl(3),
      Y: new FormControl(8),
    }),
    type: new FormControl("a scalene")
  });

  public setPoints (points) {
    this.coordForm.get('pointA').get('X').setValue(points[0][0]);
    this.coordForm.get('pointA').get('Y').setValue(points[0][1]);
    this.coordForm.get('pointB').get('X').setValue(points[1][0]);
    this.coordForm.get('pointB').get('Y').setValue(points[1][1]);
    this.coordForm.get('pointC').get('X').setValue(points[2][0]);
    this.coordForm.get('pointC').get('Y').setValue(points[2][1]);
  }

  public getPoints() {
    let raw = this.coordForm.getRawValue();
    return [
      [raw.pointA.X, raw.pointA.Y],
      [raw.pointB.X, raw.pointB.Y],
      [raw.pointC.X, raw.pointC.Y]
    ]
  }

  public distance([x1, y1], [x2, y2]) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

  public updateType(points) {
    let a = this.distance(points[0], points[1]);
    let b = this.distance(points[1], points[2]);
    let c = this.distance(points[2], points[0]);

    if (a === b && b === c) {
      this.coordForm.get('type').setValue('an equilateral')
    } else if (a === b || a === c || b === c) {
      this.coordForm.get('type').setValue('an isosceles');
    } else {
      this.coordForm.get('type').setValue('a scalene');
    }
  }



  ngOnInit(): void {
  }

}
