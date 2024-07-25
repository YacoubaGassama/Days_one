import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTacheUtilisateurComponent } from './list-tache-utilisateur.component';

describe('ListTacheUtilisateurComponent', () => {
  let component: ListTacheUtilisateurComponent;
  let fixture: ComponentFixture<ListTacheUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTacheUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTacheUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
