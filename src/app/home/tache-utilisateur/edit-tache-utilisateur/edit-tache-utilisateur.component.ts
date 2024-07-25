
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-tache-utilisateur',
  templateUrl: './edit-tache-utilisateur.component.html',
  styleUrls: ['./edit-tache-utilisateur.component.css']
})
export class EditTacheUtilisateurComponent {
  reactiveForm_edit_tache_utilisateur !: FormGroup;
  submitted: boolean = false
  loading_edit_tache_utilisateur: boolean = false
  @Input()
  tache_utilisateur_to_edit: any = {}
  @Output()
  cb_edit_tache_utilisateur=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_tache_utilisateur_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_tache_utilisateur_form()
      this.update_form(this.tache_utilisateur_to_edit)
  }
  // mise à jour du formulaire
  update_form(tache_utilisateur_to_edit:any) {
      this.reactiveForm_edit_tache_utilisateur = this.formBuilder.group({
          id_utilisateur : [tache_utilisateur_to_edit.id_utilisateur, Validators.required],
id_tache : [tache_utilisateur_to_edit.id_tache, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_tache_utilisateur .controls; }
  // validation du formulaire
  onSubmit_edit_tache_utilisateur() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_tache_utilisateur.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_tache_utilisateur.invalid) {
          return;
      }
      var tache_utilisateur = this.reactiveForm_edit_tache_utilisateur.value
      this.edit_tache_utilisateur({
      condition:JSON.stringify({id_tache_utilisateur:this.tache_utilisateur_to_edit.id_tache_utilisateur}),
      data:JSON.stringify(tache_utilisateur)
      })
  }
  // vider le formulaire
  onReset_edit_tache_utilisateur() {
      this.submitted = false;
      this.reactiveForm_edit_tache_utilisateur.reset();
  }
  edit_tache_utilisateur(tache_utilisateur: any) {
      this.loading_edit_tache_utilisateur = true;
      this.api.taf_post("tache_utilisateur/edit", tache_utilisateur, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_tache_utilisateur.emit({
                  new_data:JSON.parse(tache_utilisateur.data)
              })
              console.log("Opération effectuée avec succés sur la table tache_utilisateur. Réponse= ", reponse);
              this.onReset_edit_tache_utilisateur()
              alert("Opération effectuée avec succés sur la table tache_utilisateur")
          } else {
              console.log("L'opération sur la table tache_utilisateur a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_tache_utilisateur = false;
      }, (error: any) => {
          this.loading_edit_tache_utilisateur = false;
      })
  }
  get_details_add_tache_utilisateur_form() {
      this.loading_get_details_add_tache_utilisateur_form = true;
      this.api.taf_post("tache_utilisateur/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table tache_utilisateur. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table tache_utilisateur a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_tache_utilisateur_form = false;
      }, (error: any) => {
      this.loading_get_details_add_tache_utilisateur_form = false;
    })
  }
}
