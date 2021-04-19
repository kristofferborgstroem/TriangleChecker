import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordEditorComponent } from './coord-editor.component';

describe('CoordEditorComponent', () => {
  let component: CoordEditorComponent;
  let fixture: ComponentFixture<CoordEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
