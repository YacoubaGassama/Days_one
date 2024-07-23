import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLigneServiceComponent } from './add-ligne-service.component';

describe('AddLigneServiceComponent', () => {
  let component: AddLigneServiceComponent;
  let fixture: ComponentFixture<AddLigneServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLigneServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLigneServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
