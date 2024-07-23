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
      {libelle:"Agent",path:"/home/utilisateur"},
      {libelle:"Role",path:"/home/role"},
      {libelle:"service",path:"/home/service"},
      {libelle:"structure",path:"/home/structure"},
      {libelle:"ligne_service",path:"/home/ligne_service"},
      {libelle:"carriere",path:"/home/carriere"},

    ]
  }
  menu_agent:any = {
    titre:"Agent",
    items:[
      {libelle:"Demande",path:"/home/demande"},
      {libelle:"Role",path:"/home/role"},
      {libelle:"service",path:"/home/service"},
    ]
  }

  path:string[]=[]
  user:any
  constructor(public api: ApiService, private router: Router) {

    this.user = this.api.token.user_connected

    this.get_role()
    this.get_service()
    this.get_structure()
    this.get_carriere()

    console.log(this.path)
  }

  loading_get_carriere:boolean = false
  les_carrieres:any
  get_carriere() {
    this.loading_get_carriere = true;
    this.api.taf_post("carriere/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_carrieres = reponse.data
        console.log("Opération effectuée avec succés sur la table carriere. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table carriere a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_carriere = false;
    }, (error: any) => {
      this.loading_get_carriere = false;
    })
  }


  loading_get_structure:boolean = false
  les_structures:any
  get_structure() {
    this.loading_get_structure = true;
    this.api.taf_post("structure/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_structures = reponse.data
        console.log("Opération effectuée avec succés sur la table structure. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table structure a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_structure = false;
    }, (error: any) => {
      this.loading_get_structure = false;
    })
  }


  loading_get_role:boolean = false
  les_roles:any
  get_role() {
    this.loading_get_role = true;
    this.api.taf_post("role/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_roles = reponse.data
        console.log("Opération effectuée avec succés sur la table role. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table role a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_role = false;
    }, (error: any) => {
      this.loading_get_role = false;
    })
  }

  loading_get_service:boolean = false
  les_services:any
  get_service() {
    this.loading_get_service = true;
    this.api.taf_post("service/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_services = reponse.data
        let i:number = 0
    for(let service of this.les_services){
      this.path.push(service.nom)
    }
        console.log("Opération effectuée avec succés sur la table service. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table service a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_service = false;
    }, (error: any) => {
      this.loading_get_service = false;
    })
  }


  deconnexion() {
    this.api.delete_from_local_storage('token')
    this.router.navigate(['/public'])
  }

  isDropdownOpen = false;

  toggleDropdown(event: Event): void {
    event.preventDefault();
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
