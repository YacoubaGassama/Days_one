import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-carriere',
  templateUrl: './list-carriere.component.html',
  styleUrls: ['./list-carriere.component.css']
})
export class ListCarriereComponent {
  loading_get_carriere = false
  les_carrieres: any[] = []
  selected_carriere: any = undefined
  carriere_to_edit: any = undefined
  loading_delete_carriere = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_carriere()
  }
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

  after_add(event: any) {
    if (event.status) {
      this.les_carrieres.unshift(event.carriere)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_carrieres[this.les_carrieres.indexOf(this.carriere_to_edit)]=params.new_data
  }
  voir_plus(one_carriere: any) {
    this.selected_carriere = one_carriere
  }
  on_click_edit(one_carriere: any) {
    this.carriere_to_edit = one_carriere
  }
  on_close_modal_edit(){
    this.carriere_to_edit=undefined
  }
  delete_carriere (carriere : any){
    this.loading_delete_carriere = true;
    this.api.taf_post("carriere/delete", carriere,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table carriere . Réponse = ",reponse)
        this.get_carriere()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table carriere  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_carriere = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_carriere = false;
    })
  }
}