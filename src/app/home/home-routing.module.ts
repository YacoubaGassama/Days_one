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

const routes: Routes = [
  {path:"",component:ListDemandeComponent},
{path:"demande",component:ListDemandeComponent},
{path:"edit",component:EditDemandeComponent},
{path:"utilisateur",component:ListUtilisateurComponent},
{path:"service",component:ListServiceComponent},
{path:"role",component:ListRoleComponent},
{path:"finance",component:FinanceComponent},
{path:"scolarite",component:ScolariteComponent},
{path:"RH",component:RHComponent},
{path:"Pedagogie",component:PedagogieComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
