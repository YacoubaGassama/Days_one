
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { Md5 } from 'ts-md5';


@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent {
  @Output()
  cb_add_utilisateur=new EventEmitter()
  reactiveForm_add_utilisateur !: FormGroup;
  submitted:boolean=false
  loading_add_utilisateur :boolean=false
  form_details: any = {}
  loading_get_details_add_utilisateur_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_utilisateur_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_utilisateur  = this.formBuilder.group({
          nom: ["", Validators.required],
prenom: ["", Validators.required],
email: ["", Validators.required],
statut: ["", Validators.required],
password: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_utilisateur .controls; }
  // validation du formulaire
  onSubmit_add_utilisateur () {
      this.submitted = true;
      console.log(this.reactiveForm_add_utilisateur .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_utilisateur .invalid) {
          return;
      }
      this.reactiveForm_add_utilisateur .value.password = Md5.hashStr(this.reactiveForm_add_utilisateur .value.password )
      var utilisateur =this.reactiveForm_add_utilisateur .value
      // utilisateur.value.password = Md5.hashStr(utilisateur.value.password)
      this.add_utilisateur (utilisateur )
  }
  // vider le formulaire
  onReset_add_utilisateur () {
      this.submitted = false;
      this.reactiveForm_add_utilisateur .reset();
  }
  add_utilisateur(utilisateur: any) {
      this.loading_add_utilisateur = true;
      this.api.taf_post("utilisateur/add", utilisateur, (reponse: any) => {
      this.loading_add_utilisateur = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", reponse);
          this.onReset_add_utilisateur()
          alert("Opération éffectuée avec succés")
          this.cb_add_utilisateur.emit({
            status:true,
            utilisateur:reponse.data
          })
      } else {
          console.log("L'opération sur la table utilisateur a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_utilisateur = false;
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
}
