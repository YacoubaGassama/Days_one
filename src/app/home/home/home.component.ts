import { Component } from '@angular/core';
import { ApiService } from '../../service/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menu:any={
    titre:"Menu",
    items:[
      {libelle:"Demande",path:"/home/demande"},
{libelle:"Utilisateur",path:"/home/utilisateur"}
    ]
  }

  menu_chef:any = {
    titre:"Chef",
    items:[
      {libelle:"Demande à traiter",path:"/home/demande"},
      {libelle:"Utilisateur",path:"/home/utilisateur"}
    ]
  }
  menu_agent:any = {
    titre:"Agent",
    items:[
      {libelle:"Demande",path:"/home/demande"},
    ]
  }

  user:any
  constructor(public api: ApiService, private router: Router) {

    this.user = this.api.token.user_connected

  }

  deconnexion() {
    this.api.delete_from_local_storage('token')
    this.router.navigate(['/public'])
  }
}
