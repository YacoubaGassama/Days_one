
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-carriere',
  templateUrl: './add-carriere.component.html',
  styleUrls: ['./add-carriere.component.css']
})
export class AddCarriereComponent {
  @Output()
  cb_add_carriere=new EventEmitter()
  reactiveForm_add_carriere !: FormGroup;
  submitted:boolean=false
  loading_add_carriere :boolean=false
  form_details: any = {}
  loading_get_details_add_carriere_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_carriere_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_carriere  = this.formBuilder.group({
          niveau: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_carriere .controls; }
  // validation du formulaire
  onSubmit_add_carriere () {
      this.submitted = true;
      console.log(this.reactiveForm_add_carriere .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_carriere .invalid) {
          return;
      }
      var carriere =this.reactiveForm_add_carriere .value
      this.add_carriere (carriere )
  }
  // vider le formulaire
  onReset_add_carriere () {
      this.submitted = false;
      this.reactiveForm_add_carriere .reset();
  }
  add_carriere(carriere: any) {
      this.loading_add_carriere = true;
      this.api.taf_post("carriere/add", carriere, (reponse: any) => {
      this.loading_add_carriere = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table carriere. Réponse= ", reponse);
          this.onReset_add_carriere()
          alert("Opération éffectuée avec succés")
          this.cb_add_carriere.emit({
            status:true,
            carriere:reponse.data
          })
      } else {
          console.log("L'opération sur la table carriere a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_carriere = false;
    })
  }
  
  get_details_add_carriere_form() {
      this.loading_get_details_add_carriere_form = true;
      this.api.taf_post("carriere/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table carriere. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table carriere a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_carriere_form = false;
      }, (error: any) => {
      this.loading_get_details_add_carriere_form = false;
    })
  }
}
