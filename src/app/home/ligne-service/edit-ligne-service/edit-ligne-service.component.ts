
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-ligne-service',
  templateUrl: './edit-ligne-service.component.html',
  styleUrls: ['./edit-ligne-service.component.css']
})
export class EditLigneServiceComponent {
  reactiveForm_edit_ligne_service !: FormGroup;
  submitted: boolean = false
  loading_edit_ligne_service: boolean = false
  @Input()
  ligne_service_to_edit: any = {}
  @Output()
  cb_edit_ligne_service=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_ligne_service_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_ligne_service_form()
      this.update_form(this.ligne_service_to_edit)
  }
  // mise à jour du formulaire
  update_form(ligne_service_to_edit:any) {
      this.reactiveForm_edit_ligne_service = this.formBuilder.group({
          id_service : [ligne_service_to_edit.id_service, Validators.required],
id_strucrure : [ligne_service_to_edit.id_strucrure, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_ligne_service .controls; }
  // validation du formulaire
  onSubmit_edit_ligne_service() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_ligne_service.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_ligne_service.invalid) {
          return;
      }
      var ligne_service = this.reactiveForm_edit_ligne_service.value
      this.edit_ligne_service({
      condition:JSON.stringify({id_ligne_service:this.ligne_service_to_edit.id_ligne_service}),
      data:JSON.stringify(ligne_service)
      })
  }
  // vider le formulaire
  onReset_edit_ligne_service() {
      this.submitted = false;
      this.reactiveForm_edit_ligne_service.reset();
  }
  edit_ligne_service(ligne_service: any) {
      this.loading_edit_ligne_service = true;
      this.api.taf_post("ligne_service/edit", ligne_service, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_ligne_service.emit({
                  new_data:JSON.parse(ligne_service.data)
              })
              console.log("Opération effectuée avec succés sur la table ligne_service. Réponse= ", reponse);
              this.onReset_edit_ligne_service()
              alert("Opération effectuée avec succés sur la table ligne_service")
          } else {
              console.log("L'opération sur la table ligne_service a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_ligne_service = false;
      }, (error: any) => {
          this.loading_edit_ligne_service = false;
      })
  }
  get_details_add_ligne_service_form() {
      this.loading_get_details_add_ligne_service_form = true;
      this.api.taf_post("ligne_service/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table ligne_service. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table ligne_service a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_ligne_service_form = false;
      }, (error: any) => {
      this.loading_get_details_add_ligne_service_form = false;
    })
  }
}
