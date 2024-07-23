
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-ligne-service',
  templateUrl: './add-ligne-service.component.html',
  styleUrls: ['./add-ligne-service.component.css']
})
export class AddLigneServiceComponent {
  @Output()
  cb_add_ligne_service=new EventEmitter()
  reactiveForm_add_ligne_service !: FormGroup;
  submitted:boolean=false
  loading_add_ligne_service :boolean=false
  form_details: any = {}
  loading_get_details_add_ligne_service_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_ligne_service_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_ligne_service  = this.formBuilder.group({
          id_service: ["", Validators.required],
id_strucrure: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_ligne_service .controls; }
  // validation du formulaire
  onSubmit_add_ligne_service () {
      this.submitted = true;
      console.log(this.reactiveForm_add_ligne_service .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_ligne_service .invalid) {
          return;
      }
      var ligne_service =this.reactiveForm_add_ligne_service .value
      this.add_ligne_service (ligne_service )
  }
  // vider le formulaire
  onReset_add_ligne_service () {
      this.submitted = false;
      this.reactiveForm_add_ligne_service .reset();
  }
  add_ligne_service(ligne_service: any) {
      this.loading_add_ligne_service = true;
      this.api.taf_post("ligne_service/add", ligne_service, (reponse: any) => {
      this.loading_add_ligne_service = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table ligne_service. Réponse= ", reponse);
          this.onReset_add_ligne_service()
          alert("Opération éffectuée avec succés")
          this.cb_add_ligne_service.emit({
            status:true,
            ligne_service:reponse.data
          })
      } else {
          console.log("L'opération sur la table ligne_service a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_ligne_service = false;
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
