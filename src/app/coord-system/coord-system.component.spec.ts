import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordSystemComponent } from './coord-system.component';

describe('CoordSystemComponent', () => {
  let component: CoordSystemComponent;
  let fixture: ComponentFixture<CoordSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordSystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
