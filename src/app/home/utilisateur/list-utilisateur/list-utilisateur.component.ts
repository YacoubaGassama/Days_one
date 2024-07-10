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
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_utilisateur()
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