import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-ligne-service',
  templateUrl: './list-ligne-service.component.html',
  styleUrls: ['./list-ligne-service.component.css']
})
export class ListLigneServiceComponent {
  loading_get_ligne_service = false
  les_ligne_services: any[] = []
  selected_ligne_service: any = undefined
  ligne_service_to_edit: any = undefined
  loading_delete_ligne_service = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_ligne_service()
  }
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

  after_add(event: any) {
    if (event.status) {
      this.les_ligne_services.unshift(event.ligne_service)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_ligne_services[this.les_ligne_services.indexOf(this.ligne_service_to_edit)]=params.new_data
  }
  voir_plus(one_ligne_service: any) {
    this.selected_ligne_service = one_ligne_service
  }
  on_click_edit(one_ligne_service: any) {
    this.ligne_service_to_edit = one_ligne_service
  }
  on_close_modal_edit(){
    this.ligne_service_to_edit=undefined
  }
  delete_ligne_service (ligne_service : any){
    this.loading_delete_ligne_service = true;
    this.api.taf_post("ligne_service/delete", ligne_service,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table ligne_service . Réponse = ",reponse)
        this.get_ligne_service()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table ligne_service  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_ligne_service = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_ligne_service = false;
    })
  }
}