import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-tache',
  templateUrl: './list-tache.component.html',
  styleUrls: ['./list-tache.component.css']
})
export class ListTacheComponent {
  loading_get_tache = false
  les_taches: any[] = []
  selected_tache: any = undefined
  tache_to_edit: any = undefined
  loading_delete_tache = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_tache()
  }
  get_tache() {
    this.loading_get_tache = true;
    this.api.taf_post("tache/get", {}, (reponse: any) => {
      if (reponse.status) {
        this.les_taches = reponse.data
        console.log("Opération effectuée avec succés sur la table tache. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table tache a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_tache = false;
    }, (error: any) => {
      this.loading_get_tache = false;
    })
  }

  after_add(event: any) {
    if (event.status) {
      this.les_taches.unshift(event.tache)
      this.get_tache()

    } else {

    }
  }
  after_edit(params: any) {
    this.les_taches[this.les_taches.indexOf(this.tache_to_edit)]=params.new_data
  }
  voir_plus(one_tache: any) {
    this.selected_tache = one_tache
  }
  on_click_edit(one_tache: any) {
    this.tache_to_edit = one_tache
  }
  on_close_modal_edit(){
    this.tache_to_edit=undefined
  }
  delete_tache (tache : any){
    this.loading_delete_tache = true;
    this.api.taf_post("tache/delete", tache,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table tache . Réponse = ",reponse)
        this.get_tache()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table tache  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_tache = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_tache = false;
    })
  }
}
