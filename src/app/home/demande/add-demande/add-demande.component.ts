
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-demande',
  templateUrl: './add-demande.component.html',
  styleUrls: ['./add-demande.component.css']
})
export class AddDemandeComponent {
  @Output()
  cb_add_demande=new EventEmitter()
  reactiveForm_add_demande !: FormGroup;
  submitted:boolean=false
  loading_add_demande :boolean=false
  form_details: any = {}
  loading_get_details_add_demande_form = false
  user:any
  constructor(private formBuilder: FormBuilder,public api:ApiService) {

    this.user = this.api.token.user_connected
   }

  ngOnInit(): void {
      this.get_details_add_demande_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_demande  = this.formBuilder.group({
          type: ["", Validators.required],
etat: ["en cours", Validators.required],
demandeur: [this.user.id_utilisateur, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_demande .controls; }
  // validation du formulaire
  onSubmit_add_demande () {
      this.submitted = true;
      console.log(this.reactiveForm_add_demande .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_demande .invalid) {
          return;
      }
      var demande =this.reactiveForm_add_demande .value
      this.add_demande (demande )
  }
  // vider le formulaire
  onReset_add_demande () {
      this.submitted = false;
      this.reactiveForm_add_demande .reset();
  }
  add_demande(demande: any) {
      this.loading_add_demande = true;
      this.api.taf_post("demande/add", demande, (reponse: any) => {
      this.loading_add_demande = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table demande. Réponse= ", reponse);
          this.onReset_add_demande()
          alert("Opération éffectuée avec succés")
          this.cb_add_demande.emit({
            status:true,
            demande:reponse.data
          })
      } else {
          console.log("L'opération sur la table demande a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_demande = false;
    })
  }

  get_details_add_demande_form() {
      this.loading_get_details_add_demande_form = true;
      this.api.taf_post("demande/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table demande. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table demande a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_demande_form = false;
      }, (error: any) => {
      this.loading_get_details_add_demande_form = false;
    })
  }
}
