
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-tache-utilisateur',
  templateUrl: './add-tache-utilisateur.component.html',
  styleUrls: ['./add-tache-utilisateur.component.css']
})
export class AddTacheUtilisateurComponent {
  @Output()
  cb_add_tache_utilisateur=new EventEmitter()
  @Input() service!: number
  @Input() agent!: number
  reactiveForm_add_tache_utilisateur !: FormGroup;
  submitted:boolean=false
  loading_add_tache_utilisateur :boolean=false
  form_details: any = {}
  loading_get_details_add_tache_utilisateur_form = false
  user:any
  selected_agent:number = 0
  constructor(private formBuilder: FormBuilder,public api:ApiService) {

    this.user = this.api.token.user_connected
   }

  ngOnInit(): void {
      this.get_details_add_tache_utilisateur_form()
      this.init_form()
      this.get_service()
      this.get_utilisateur()
  }
  init_form() {
    if(this.agent == undefined){
      this.reactiveForm_add_tache_utilisateur  = this.formBuilder.group({
        id_utilisateur: ["", Validators.required],
        id_tache: ["", Validators.required]
      });
    }else if(this.agent != undefined){
      this.reactiveForm_add_tache_utilisateur  = this.formBuilder.group({
        id_utilisateur: [this.agent, Validators.required],
        id_tache: ["", Validators.required]
      });
    }
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_tache_utilisateur .controls; }
  // validation du formulaire
  onSubmit_add_tache_utilisateur () {
      this.submitted = true;
      console.log(this.reactiveForm_add_tache_utilisateur .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_tache_utilisateur .invalid) {
          return;
      }
      var tache_utilisateur =this.reactiveForm_add_tache_utilisateur .value
      this.add_tache_utilisateur (tache_utilisateur )
  }
  // vider le formulaire
  onReset_add_tache_utilisateur () {
      this.submitted = false;
      this.reactiveForm_add_tache_utilisateur .reset();
  }
  add_tache_utilisateur(tache_utilisateur: any) {
      this.loading_add_tache_utilisateur = true;
      this.api.taf_post("tache_utilisateur/add", tache_utilisateur, (reponse: any) => {
      this.loading_add_tache_utilisateur = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table tache_utilisateur. Réponse= ", reponse);
          this.onReset_add_tache_utilisateur()
          alert("Opération éffectuée avec succés")
          this.cb_add_tache_utilisateur.emit({
            status:true,
            tache_utilisateur:reponse.data
          })
      } else {
          console.log("L'opération sur la table tache_utilisateur a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_tache_utilisateur = false;
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
}
