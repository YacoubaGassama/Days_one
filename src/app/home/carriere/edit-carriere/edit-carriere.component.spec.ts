import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarriereComponent } from './edit-carriere.component';

describe('EditCarriereComponent', () => {
  let component: EditCarriereComponent;
  let fixture: ComponentFixture<EditCarriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCarriereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditCarriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
