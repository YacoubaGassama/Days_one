import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarriereComponent } from './list-carriere.component';

describe('ListCarriereComponent', () => {
  let component: ListCarriereComponent;
  let fixture: ComponentFixture<ListCarriereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCarriereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCarriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
