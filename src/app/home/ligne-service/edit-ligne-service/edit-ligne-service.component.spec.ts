import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLigneServiceComponent } from './edit-ligne-service.component';

describe('EditLigneServiceComponent', () => {
  let component: EditLigneServiceComponent;
  let fixture: ComponentFixture<EditLigneServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLigneServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLigneServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
