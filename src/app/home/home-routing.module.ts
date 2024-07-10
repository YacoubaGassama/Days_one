import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDemandeComponent } from './demande/list-demande/list-demande.component';
import { ListUtilisateurComponent } from './utilisateur/list-utilisateur/list-utilisateur.component';
import { EditDemandeComponent } from './demande/edit-demande/edit-demande.component';

const routes: Routes = [
  {path:"",component:ListDemandeComponent},
{path:"demande",component:ListDemandeComponent},
{path:"edit",component:EditDemandeComponent},
{path:"utilisateur",component:ListUtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
