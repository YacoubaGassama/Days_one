import { Component } from '@angular/core';
import { ApiService } from '../service/api/api.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

  user:any
  constructor(private api:ApiService){

    this.user = this.api.token.user_connected
    this.get_carriere()
    this.get_service()
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


  loading_get_service:boolean = false
  les_services:any
  get_service() {
    this.loading_get_service = true;
    this.api.taf_post("service/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_services = reponse.data
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

}
