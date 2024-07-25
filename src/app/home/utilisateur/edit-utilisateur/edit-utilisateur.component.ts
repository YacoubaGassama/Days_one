
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-utilisateur',
  templateUrl: './edit-utilisateur.component.html',
  styleUrls: ['./edit-utilisateur.component.css']
})
export class EditUtilisateurComponent {
  reactiveForm_edit_utilisateur !: FormGroup;
  submitted: boolean = false
  loading_edit_utilisateur: boolean = false
  @Input()
  utilisateur_to_edit: any = {}
  @Output()
  cb_edit_utilisateur=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_utilisateur_form = false
  user:any
  constructor(private formBuilder: FormBuilder, public api: ApiService) {
      this.user = this.api.token.user_connected
  }
  ngOnInit(): void {
      this.get_details_add_utilisateur_form()
      this.update_form(this.utilisateur_to_edit)
      this.get_structure()
  }
  // mise à jour du formulaire
  update_form(utilisateur_to_edit:any) {
      this.reactiveForm_edit_utilisateur = this.formBuilder.group({
          nom : [utilisateur_to_edit.nom, Validators.required],
prenom : [utilisateur_to_edit.prenom, Validators.required],
email : [utilisateur_to_edit.email, Validators.required],
statut : [utilisateur_to_edit.statut, Validators.required],
id_structure : [utilisateur_to_edit.id_structure, Validators.required],
id_service : [utilisateur_to_edit.id_service, Validators.required],
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_utilisateur .controls; }
  // validation du formulaire
  onSubmit_edit_utilisateur() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_utilisateur.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_utilisateur.invalid) {
          return;
      }
      var utilisateur = this.reactiveForm_edit_utilisateur.value
      this.edit_utilisateur({
      condition:JSON.stringify({id_utilisateur:this.utilisateur_to_edit.id_utilisateur}),
      data:JSON.stringify(utilisateur)
      })
  }
  // vider le formulaire
  onReset_edit_utilisateur() {
      this.submitted = false;
      this.reactiveForm_edit_utilisateur.reset();
  }
  edit_utilisateur(utilisateur: any) {
      this.loading_edit_utilisateur = true;
      this.api.taf_post("utilisateur/edit", utilisateur, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_utilisateur.emit({
                  new_data:JSON.parse(utilisateur.data)
              })
              console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", reponse);
              this.onReset_edit_utilisateur()
              alert("Opération effectuée avec succés sur la table utilisateur")
          } else {
              console.log("L'opération sur la table utilisateur a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_utilisateur = false;
      }, (error: any) => {
          this.loading_edit_utilisateur = false;
      })
  }
  get_details_add_utilisateur_form() {
      this.loading_get_details_add_utilisateur_form = true;
      this.api.taf_post("utilisateur/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table utilisateur a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_utilisateur_form = false;
      }, (error: any) => {
      this.loading_get_details_add_utilisateur_form = false;
    })
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
}
