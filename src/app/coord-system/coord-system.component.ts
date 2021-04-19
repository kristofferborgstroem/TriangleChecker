import {AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {AppComponent} from 'src/app/app.component';

@Component({
  selector: 'app-coord-system',
  templateUrl: './coord-system.component.html',
  styleUrls: ['./coord-system.component.css']
})
export class CoordSystemComponent implements AfterViewInit {

  @ViewChild('canvas') canvas: ElementRef;

  @Output() change = new EventEmitter<string> ();


  private context = CanvasRenderingContext2D;

  public points = [];
  public scale = 40;
  public gridLevels = [[0.1, 1000],[0.2, 500], [0.5, 100], [1, 50], [5, 10], [10, 5], [20, 2], [40, 1]];
  public grid = 1;
  public mousedown = false;
  private hover = [false, false, false];
  private pointSelected = -1;


  constructor() {}



  ngAfterViewInit() {
    this.context = (this.canvas.nativeElement as HTMLCanvasElement).getContext('2d');
    this.updateBoard();
  }

  public setPoints(points) {
    this.points = points;
    this.strokeBoard();
  }

  public setGrid() {
    this.gridLevels.forEach(element => {
      if(this.scale >= element[0]) {
        this.grid = element[1];
      }
    })
  }

  public toScreenCoord(x) {
    return x / this.context.getTransform().a;
  }


  public getMouseCoords(event) {
    const rect = this.context.canvas.getBoundingClientRect();
    let x = this.toScreenCoord(event.clientX - Math.round(rect.left));
    let y = this.toScreenCoord(event.clientY - Math.round(rect.top));
    return [x, y];
  }

  public isWithin(x, y, mx, my, amount) {
    return mx > x - amount && mx < x + amount && my > y - amount && my < y + amount;
  }


  public zoom(event ) {
    event.preventDefault();
    if (event.deltaY < 0) {
      this.scale = Math.min(this.scale * (1 + event.deltaY * -0.001), 50);
    } else {
      this.scale = Math.max(this.scale * (1 + event.deltaY * -0.001), 0.05);
    }
    this.setGrid();
    this.strokeBoard();
  }

  public mouseMove(event) {
    this.getPoints();
    this.mousedown = true;
    let [x, y] = this.getMouseCoords(event);

    for (let i = 0; i < this.points.length; i++) {
      this.hover[i] = this.isWithin(this.points[i][0], this.points[i][1], x, y, this.toScreenCoord(10));
    }

    if(this.mousedown && this.pointSelected != -1) {

      let xround = Math.round(x / this.grid) * this.grid;
      let yround = Math.round(y / this.grid) * this.grid;

      if (this.isWithin(xround, yround, x, y, this.toScreenCoord(10))) {
        this.points[this.pointSelected][0] = xround;
        this.points[this.pointSelected][1] = yround;
      }
      else {
        this.points[this.pointSelected][0] = x;
        this.points[this.pointSelected][1] = y;
      }

      this.strokeBoard();
    }

    this.strokeBoard();
  }

  public mouseDown(event) {
    let coords = this.getMouseCoords(event);

    for (let i = 0; i < this.points.length; i++) {
      if (this.isWithin(this.points[i][0], this.points[i][1], coords[0], coords[1], this.toScreenCoord(10))) {
        this.pointSelected = i;

      }
    }
  }

  public mouseUp(event) {
    this.mousedown = false;
    this.pointSelected = -1;
  }

  public updateBoard() {
    this.context.canvas.width = window.innerWidth;
    this.context.canvas.height = window.innerHeight * 0.9;
    this.strokeBoard();
  }


  public getPoints() {
    this.change.emit('points changed');
  }


  private drawNodes() {
    this.context.lineWidth = this.toScreenCoord(2);
    this.context.fillStyle = "#4CF59E";
    for(let i = 0; i < this.points.length; i++) {
      if(this.hover[i]) {
        this.context.strokeStyle = "Black";
      } else this.context.strokeStyle = "#4CF59E";
      this.context.beginPath();
      let point = this.points[i];
      this.context.arc(point[0], point[1], this.toScreenCoord(5), 0, 2 * Math.PI);
      this.context.fill();
      this.context.stroke();
    }

  }

  private drawEdges() {
    this.context.lineWidth = 3 / this.context.getTransform().a;
    this.context.strokeStyle = "#4CF59E";
    this.context.fillStyle = "#4CF59E";

    this.context.beginPath();
    for(let i = 0; i < this.points.length; i++) {
      let pointA = this.points[i];
      let pointB = this.points[(i + 1) % this.points.length];
      this.context.moveTo(pointA[0], pointA[1]);
      this.context.lineTo(pointB[0], pointB[1]);
    }

    this.context.stroke();
  }

  private strokeBackground() {
    const width = this.canvas.nativeElement.width / this.context.getTransform().a;
    const height = this.canvas.nativeElement.height /  this.context.getTransform().a;
    this.context.strokeStyle = "#EDF0F0";
    this.context.lineWidth = 1 / this.context.getTransform().a;
    for (let x = 0; x < width; x += this.grid) {
      this.context.beginPath();
      this.context.moveTo(x, 0);
      this.context.lineTo(x, height);
      this.context.stroke();
    }

    for (let y = 0; y < height; y += this.grid) {
      this.context.beginPath();
      this.context.moveTo(0, y);
      this.context.lineTo(width, y);
      this.context.stroke();
    }
  }

  private clear() {
    let width = this.context.canvas.width / this.context.getTransform().a;
    let height = this.context.canvas.height / this.context.getTransform().a;
    this.context.clearRect(0,0, width, height);
  }

  private strokeContent() {
    this.drawEdges();
    this.drawNodes();
  }

  private strokeBoard() {
    this.clear();
    this.context.setTransform(this.scale, 0,0, this.scale, 0, 0);
    this.strokeBackground();
    this.strokeContent();
  }

}
