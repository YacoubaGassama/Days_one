import { Component } from '@angular/core';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent {
  loading_get_role = false
  les_roles: any[] = []
  selected_role: any = undefined
  role_to_edit: any = undefined
  loading_delete_role = false
  constructor(public api: ApiService,) {

  }
  ngOnInit(): void {
    this.get_role()
    this.get_service()
this.get_utilisateur()
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

  after_add(event: any) {
    if (event.status) {
      this.les_roles.unshift(event.role)
    } else {

    }
  }
  after_edit(params: any) {
    this.les_roles[this.les_roles.indexOf(this.role_to_edit)]=params.new_data
  }
  voir_plus(one_role: any) {
    this.selected_role = one_role
  }
  on_click_edit(one_role: any) {
    this.role_to_edit = one_role
  }
  on_close_modal_edit(){
    this.role_to_edit=undefined
  }
  delete_role (role : any){
    this.loading_delete_role = true;
    this.api.taf_post("role/delete", role,(reponse: any)=>{
      //when success
      if(reponse.status){
        console.log("Opération effectuée avec succés sur la table role . Réponse = ",reponse)
        this.get_role()
        alert("Opération effectuée avec succés")
      }else{
        console.log("L'opération sur la table role  a échoué. Réponse = ",reponse)
        alert("L'opération a échouée")
      }
      this.loading_delete_role = false;
    },
    (error: any)=>{
      //when error
      console.log("Erreur inconnue! ",error)
      this.loading_delete_role = false;
    })
  }
}
