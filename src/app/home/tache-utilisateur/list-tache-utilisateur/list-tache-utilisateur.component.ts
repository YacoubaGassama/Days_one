import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-tache-utilisateur',
  templateUrl: './list-tache-utilisateur.component.html',
  styleUrls: ['./list-tache-utilisateur.component.css']
})
export class ListTacheUtilisateurComponent {
  loading_get_tache_utilisateur = false
  les_tache_utilisateurs: any[] = []
  selected_tache_utilisateur: any = undefined
  tache_utilisateur_to_edit: any = undefined
  loading_delete_tache_utilisateur = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_tache_utilisateur()
  }
  get_tache_utilisateur() {
    this.loading_get_tache_utilisateur = true;
    this.api.taf_post("tache_utilisateur/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_tache_utilisateurs = reponse.data
        console.log("Opération effectuée avec succés sur la table tache_utilisateur. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table tache_utilisateur a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_tache_utilisateur = false;
    }, (error: any) => {
      this.loading_get_tache_utilisateur = false;
    })
  }

  after_add(event: any) {
    if (event.status) {

      this.les_tache_utilisateurs.unshift(event.tache_utilisateur)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_tache_utilisateurs[this.les_tache_utilisateurs.indexOf(this.tache_utilisateur_to_edit)]=params.new_data
  }
  voir_plus(one_tache_utilisateur: any) {
    this.selected_tache_utilisateur = one_tache_utilisateur
  }
  on_click_edit(one_tache_utilisateur: any) {
    this.tache_utilisateur_to_edit = one_tache_utilisateur
  }
  on_close_modal_edit(){
    this.tache_utilisateur_to_edit=undefined
  }
  delete_tache_utilisateur (tache_utilisateur : any){
    this.loading_delete_tache_utilisateur = true;
    this.api.taf_post("tache_utilisateur/delete", tache_utilisateur,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table tache_utilisateur . Réponse = ",reponse)
        this.get_tache_utilisateur()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table tache_utilisateur  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_tache_utilisateur = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_tache_utilisateur = false;
    })
  }
}
