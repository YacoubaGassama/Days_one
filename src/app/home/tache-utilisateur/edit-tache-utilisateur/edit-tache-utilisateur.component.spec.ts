import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTacheUtilisateurComponent } from './edit-tache-utilisateur.component';

describe('EditTacheUtilisateurComponent', () => {
  let component: EditTacheUtilisateurComponent;
  let fixture: ComponentFixture<EditTacheUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTacheUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTacheUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
