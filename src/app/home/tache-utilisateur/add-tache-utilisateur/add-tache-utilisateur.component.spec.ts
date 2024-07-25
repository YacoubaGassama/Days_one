import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTacheUtilisateurComponent } from './add-tache-utilisateur.component';

describe('AddTacheUtilisateurComponent', () => {
  let component: AddTacheUtilisateurComponent;
  let fixture: ComponentFixture<AddTacheUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTacheUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTacheUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
