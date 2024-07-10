import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  
  import { HomeRoutingModule } from './home-routing.module';
  import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddDemandeComponent } from './demande/add-demande/add-demande.component';
import { EditDemandeComponent } from './demande/edit-demande/edit-demande.component';
import { ListDemandeComponent } from './demande/list-demande/list-demande.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { EditUtilisateurComponent } from './utilisateur/edit-utilisateur/edit-utilisateur.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
  
  
  @NgModule({
    declarations: [
    HomeComponent,
    AddDemandeComponent,
    EditDemandeComponent,
    ListDemandeComponent,
    AddUtilisateurComponent,
    EditUtilisateurComponent,
    ListUtilisateurComponent
  ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      ReactiveFormsModule
    ]
  })
  export class HomeModule { }
  