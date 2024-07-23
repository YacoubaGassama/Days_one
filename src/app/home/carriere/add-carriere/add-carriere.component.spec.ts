import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarriereComponent } from './add-carriere.component';

describe('AddCarriereComponent', () => {
  let component: AddCarriereComponent;
  let fixture: ComponentFixture<AddCarriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCarriereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCarriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
