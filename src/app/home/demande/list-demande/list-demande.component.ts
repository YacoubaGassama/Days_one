import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent {
  loading_get_demande = false
  les_demandes: any[] = []
  selected_demande: any = undefined
  demande_to_edit: any = undefined
  loading_delete_demande = false
  user:any
  constructor(public api: ApiService,) {

    this.user = this.api.token.user_connected
  }
  ngOnInit(): void {
    this.get_demande()
    this.get_utilisateur()
  }
  get_demande() {
    this.loading_get_demande = true;
    this.api.taf_post("demande/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_demandes = reponse.data
        console.log("Opération effectuée avec succés sur la table demande. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table demande a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_demande = false;
    }, (error: any) => {
      this.loading_get_demande = false;
    })
  }

  loading_get_utilisateur:boolean = false
  les_utilisateurs:any
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
      this.les_demandes.unshift(event.demande)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_demandes[this.les_demandes.indexOf(this.demande_to_edit)]=params.new_data
  }
  voir_plus(one_demande: any) {
    this.selected_demande = one_demande
  }
  on_click_edit(one_demande: any) {
    this.demande_to_edit = one_demande
  }
  on_close_modal_edit(){
    this.demande_to_edit=undefined
  }
  delete_demande (demande : any){
    this.loading_delete_demande = true;
    this.api.taf_post("demande/delete", demande,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table demande . Réponse = ",reponse)
        this.get_demande()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table demande  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_demande = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_demande = false;
    })
  }
}
