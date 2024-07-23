import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-structure',
  templateUrl: './list-structure.component.html',
  styleUrls: ['./list-structure.component.css']
})
export class ListStructureComponent {
  loading_get_structure = false
  les_structures: any[] = []
  selected_structure: any = undefined
  structure_to_edit: any = undefined
  loading_delete_structure = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_structure()
  }
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

  after_add(event: any) {
    if (event.status) {
      this.les_structures.unshift(event.structure)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_structures[this.les_structures.indexOf(this.structure_to_edit)]=params.new_data
  }
  voir_plus(one_structure: any) {
    this.selected_structure = one_structure
  }
  on_click_edit(one_structure: any) {
    this.structure_to_edit = one_structure
  }
  on_close_modal_edit(){
    this.structure_to_edit=undefined
  }
  delete_structure (structure : any){
    this.loading_delete_structure = true;
    this.api.taf_post("structure/delete", structure,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table structure . Réponse = ",reponse)
        this.get_structure()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table structure  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_structure = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_structure = false;
    })
  }
}