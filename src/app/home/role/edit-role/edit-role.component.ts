
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent {
  reactiveForm_edit_role !: FormGroup;
  submitted: boolean = false
  loading_edit_role: boolean = false
  @Input()
  role_to_edit: any = {}
  @Output()
  cb_edit_role=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_role_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_role_form()
      this.update_form(this.role_to_edit)
  }
  // mise à jour du formulaire
  update_form(role_to_edit:any) {
      this.reactiveForm_edit_role = this.formBuilder.group({
          nom : [role_to_edit.nom, Validators.required],
id_utilisateur : [role_to_edit.id_utilisateur, Validators.required],
id_service : [role_to_edit.id_service, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_role .controls; }
  // validation du formulaire
  onSubmit_edit_role() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_role.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_role.invalid) {
          return;
      }
      var role = this.reactiveForm_edit_role.value
      this.edit_role({
      condition:JSON.stringify({id_role:this.role_to_edit.id_role}),
      data:JSON.stringify(role)
      })
  }
  // vider le formulaire
  onReset_edit_role() {
      this.submitted = false;
      this.reactiveForm_edit_role.reset();
  }
  edit_role(role: any) {
      this.loading_edit_role = true;
      this.api.taf_post("role/edit", role, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_role.emit({
                  new_data:JSON.parse(role.data)
              })
              console.log("Opération effectuée avec succés sur la table role. Réponse= ", reponse);
              this.onReset_edit_role()
              alert("Opération effectuée avec succés sur la table role")
          } else {
              console.log("L'opération sur la table role a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_role = false;
      }, (error: any) => {
          this.loading_edit_role = false;
      })
  }
  get_details_add_role_form() {
      this.loading_get_details_add_role_form = true;
      this.api.taf_post("role/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table role. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table role a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_role_form = false;
      }, (error: any) => {
      this.loading_get_details_add_role_form = false;
    })
  }
}
