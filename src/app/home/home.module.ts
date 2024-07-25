import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';

  import { HomeRoutingModule } from './home-routing.module';
  import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AddDemandeComponent } from './demande/add-demande/add-demande.component';
import { EditDemandeComponent } from './demande/edit-demande/edit-demande.component';
import { ListDemandeComponent } from './demande/list-demande/list-demande.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { EditUtilisateurComponent } from './utilisateur/edit-utilisateur/edit-utilisateur.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { AddRoleComponent } from './role/add-role/add-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { ListRoleComponent } from './role/list-role/list-role.component';
import { AddServiceComponent } from './service/add-service/add-service.component';
import { EditServiceComponent } from './service/edit-service/edit-service.component';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { AddPrivilegeComponent } from './privilege/add-privilege/add-privilege.component';
import { EditPrivilegeComponent } from './privilege/edit-privilege/edit-privilege.component';
import { ListPrivilegeComponent } from './privilege/list-privilege/list-privilege.component';
import { AddStructureComponent } from './structure/add-structure/add-structure.component';
import { EditStructureComponent } from './structure/edit-structure/edit-structure.component';
import { ListStructureComponent } from './structure/list-structure/list-structure.component';
import { AddCarriereComponent } from './carriere/add-carriere/add-carriere.component';
import { EditCarriereComponent } from './carriere/edit-carriere/edit-carriere.component';
import { ListCarriereComponent } from './carriere/list-carriere/list-carriere.component';
import { AddLigneServiceComponent } from './ligne-service/add-ligne-service/add-ligne-service.component';
import { EditLigneServiceComponent } from './ligne-service/edit-ligne-service/edit-ligne-service.component';
import { ListLigneServiceComponent } from './ligne-service/list-ligne-service/list-ligne-service.component';
import { AddTacheComponent } from './tache/add-tache/add-tache.component';
import { EditTacheComponent } from './tache/edit-tache/edit-tache.component';
import { ListTacheComponent } from './tache/list-tache/list-tache.component';
import { AddTacheUtilisateurComponent } from './tache-utilisateur/add-tache-utilisateur/add-tache-utilisateur.component';
import { EditTacheUtilisateurComponent } from './tache-utilisateur/edit-tache-utilisateur/edit-tache-utilisateur.component';
import { ListTacheUtilisateurComponent } from './tache-utilisateur/list-tache-utilisateur/list-tache-utilisateur.component';


  @NgModule({
    declarations: [
    HomeComponent,
    AddDemandeComponent,
    EditDemandeComponent,
    ListDemandeComponent,
    AddUtilisateurComponent,
    EditUtilisateurComponent,
    ListUtilisateurComponent,
    AddRoleComponent,
    EditRoleComponent,
    ListRoleComponent,
    AddServiceComponent,
    EditServiceComponent,
    ListServiceComponent,
    AddPrivilegeComponent,
    EditPrivilegeComponent,
    ListPrivilegeComponent,
    AddStructureComponent,
    EditStructureComponent,
    ListStructureComponent,
    AddCarriereComponent,
    EditCarriereComponent,
    ListCarriereComponent,
    AddLigneServiceComponent,
    EditLigneServiceComponent,
    ListLigneServiceComponent,
    AddTacheComponent,
    EditTacheComponent,
    ListTacheComponent,
    AddTacheUtilisateurComponent,
    EditTacheUtilisateurComponent,
    ListTacheUtilisateurComponent
  ],
    imports: [
      CommonModule,
      HomeRoutingModule,
      ReactiveFormsModule,
      FormsModule
    ]
  })
  export class HomeModule { }
