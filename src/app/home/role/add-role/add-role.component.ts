
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {
  @Output()
  cb_add_role=new EventEmitter()
  reactiveForm_add_role !: FormGroup;
  submitted:boolean=false
  loading_add_role :boolean=false
  form_details: any = {}
  loading_get_details_add_role_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_role_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_role  = this.formBuilder.group({
          nom: ["", Validators.required],
id_utilisateur: ["", Validators.required],
id_service: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_role .controls; }
  // validation du formulaire
  onSubmit_add_role () {
      this.submitted = true;
      console.log(this.reactiveForm_add_role .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_role .invalid) {
          return;
      }
      var role =this.reactiveForm_add_role .value
      this.add_role (role )
  }
  // vider le formulaire
  onReset_add_role () {
      this.submitted = false;
      this.reactiveForm_add_role .reset();
  }
  add_role(role: any) {
      this.loading_add_role = true;
      this.api.taf_post("role/add", role, (reponse: any) => {
      this.loading_add_role = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table role. Réponse= ", reponse);
          this.onReset_add_role()
          alert("Opération éffectuée avec succés")
          this.cb_add_role.emit({
            status:true,
            role:reponse.data
          })
      } else {
          console.log("L'opération sur la table role a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_role = false;
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
