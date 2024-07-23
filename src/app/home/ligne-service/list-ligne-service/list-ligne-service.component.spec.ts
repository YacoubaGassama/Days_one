import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneServiceComponent } from './list-ligne-service.component';

describe('ListLigneServiceComponent', () => {
  let component: ListLigneServiceComponent;
  let fixture: ComponentFixture<ListLigneServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLigneServiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListLigneServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
