import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.css']
})
export class ListUtilisateurComponent {
  loading_get_utilisateur = false
  les_utilisateurs: any[] = []
  selected_utilisateur: any = undefined
  utilisateur_to_edit: any = undefined
  loading_delete_utilisateur = false
  user:any
  constructor(public api: ApiService,) {

    this.user = this.api.token.user_connected
  }
  ngOnInit(): void {
    this.get_utilisateur()
    this.get_ligne_service()
    this.get_service()
    this.get_structure()
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

  loading_get_service:boolean =false
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

  loading_get_ligne_service:boolean = false
  les_ligne_services:any
  get_ligne_service() {
    this.loading_get_ligne_service = true;
    this.api.taf_post("ligne_service/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_ligne_services = reponse.data
        console.log("Opération effectuée avec succés sur la table ligne_service. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table ligne_service a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_ligne_service = false;
    }, (error: any) => {
      this.loading_get_ligne_service = false;
    })
  }


  get_utilisateur() {
    this.loading_get_utilisateur = true;
    this.api.taf_post("utilisateur/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_utilisateurs = reponse.data
        console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table utilisateur a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_utilisateur = false;
    }, (error: any) => {
      this.loading_get_utilisateur = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_utilisateurs.unshift(event.utilisateur)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_utilisateurs[this.les_utilisateurs.indexOf(this.utilisateur_to_edit)]=params.new_data
  }
  voir_plus(one_utilisateur: any) {
    this.selected_utilisateur = one_utilisateur
  }
  on_click_edit(one_utilisateur: any) {
    this.utilisateur_to_edit = one_utilisateur
  }
  on_close_modal_edit(){
    this.utilisateur_to_edit=undefined
  }
  delete_utilisateur (utilisateur : any){
    this.loading_delete_utilisateur = true;
    this.api.taf_post("utilisateur/delete", utilisateur,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table utilisateur . Réponse = ",reponse)
        this.get_utilisateur()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table utilisateur  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_utilisateur = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_utilisateur = false;
    })
  }
}


