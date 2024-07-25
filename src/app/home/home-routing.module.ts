import { ListRoleComponent } from './role/list-role/list-role.component';
import { ListServiceComponent } from './service/list-service/list-service.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDemandeComponent } from './demande/list-demande/list-demande.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { EditDemandeComponent } from './demande/edit-demande/edit-demande.component';
import { FinanceComponent } from './finance/finance.component';
import { ScolariteComponent } from '../scolarite/scolarite.component';
import { RHComponent } from '../rh/rh.component';
import { PedagogieComponent } from '../pedagogie/pedagogie.component';
import { ListStructureComponent } from './structure/list-structure/list-structure.component';
import { AddUtilisateurComponent } from './utilisateur/add-utilisateur/add-utilisateur.component';
import { ListPrivilegeComponent } from './privilege/list-privilege/list-privilege.component';
import { ListLigneServiceComponent } from './ligne-service/list-ligne-service/list-ligne-service.component';
import { ProfilComponent } from '../profil/profil.component';
import { ListCarriereComponent } from './carriere/list-carriere/list-carriere.component';
import { AddDemandeComponent } from './demande/add-demande/add-demande.component';
import { ListTacheComponent } from './tache/list-tache/list-tache.component';
import { ListTacheUtilisateurComponent } from './tache-utilisateur/list-tache-utilisateur/list-tache-utilisateur.component';

const routes: Routes = [
  // {path:"",component:ListUtilisateurComponent},
{path:"demande",component:ListDemandeComponent},
{path:"edit",component:EditDemandeComponent},
{path:"utilisateur",component:ListUtilisateurComponent},
{path:"addutilisateur",component:AddUtilisateurComponent},
{path:"service",component:ListServiceComponent},
{path:"role",component:ListRoleComponent},
{path:"finance",component:FinanceComponent},
{path:"scolarite",component:ScolariteComponent},
{path:"RH",component:RHComponent},
{path:"Pedagogie",component:PedagogieComponent},
{path:"structure",component:ListStructureComponent},
{path:"privilege",component:ListPrivilegeComponent},
{path:"ligne_service",component:ListLigneServiceComponent},
{path:"profil",component:ProfilComponent},
{path:"carriere",component:ListCarriereComponent},
{path:"EffectuerDemande",component:AddDemandeComponent},
{path:"tache",component:ListTacheComponent},
{path:"affectationTache",component:ListTacheUtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
