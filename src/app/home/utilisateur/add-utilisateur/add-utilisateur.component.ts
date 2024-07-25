
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
import { Md5 } from 'ts-md5';
import { BlobOptions } from 'node:buffer';


@Component({
  selector: 'app-add-utilisateur',
  templateUrl: './add-utilisateur.component.html',
  styleUrls: ['./add-utilisateur.component.css']
})
export class AddUtilisateurComponent {
  after_add($event: any) {
    throw new Error('Method not implemented.');
  }
  @Output()
  cb_add_utilisateur = new EventEmitter()
  reactiveForm_add_utilisateur !: FormGroup;
  submitted: boolean = false
  loading_add_utilisateur: boolean = false
  form_details: any = {}
  loading_get_details_add_utilisateur_form = false
  currentItem: any;
  statut!: string
  structure!: string
  service!: number
tache!: string
  user: any
  constructor(private formBuilder: FormBuilder, public api: ApiService) {

    this.user = this.api.token.user_connected
  }

  ngOnInit(): void {
    this.get_details_add_utilisateur_form()
    this.init_form()
    this.get_structure()
    this.get_utilisateur()
  }
  init_form() {
    if (this.user.statut == 'chef') {

      this.reactiveForm_add_utilisateur = this.formBuilder.group({
        nom: ["", Validators.required],
        prenom: ["", Validators.required],
        email: ["", Validators.required],
        statut: ["agent", Validators.required],
        password: ["", Validators.required],
        id_structure: [this.user.structure, Validators.required],
        id_carriere: [1, Validators.required],
        id_service: [""]
      });
    } else {
      this.reactiveForm_add_utilisateur = this.formBuilder.group({
        nom: ["", Validators.required],
        prenom: ["", Validators.required],
        email: ["", Validators.required],
        statut: ["", Validators.required],
        password: ["", Validators.required],
        id_structure: ["", Validators.required],
        id_carriere: [1, Validators.required],
        id_service: [""]
      });
    }
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_utilisateur.controls; }
  // validation du formulaire
  onSubmit_add_utilisateur() {
    this.submitted = true;
    console.log(this.reactiveForm_add_utilisateur.value)
    // stop here if form is invalid
    if (this.reactiveForm_add_utilisateur.invalid) {
      return;
    }
    var utilisateur = this.reactiveForm_add_utilisateur.value
    utilisateur.password = Md5.hashStr(utilisateur.password)
    this.add_utilisateur(utilisateur)
  }
  // vider le formulaire
  onReset_add_utilisateur() {
    this.submitted = false;
    this.reactiveForm_add_utilisateur.reset();
  }
  add_utilisateur(utilisateur: any) {
    this.loading_add_utilisateur = true;
    this.api.taf_post("utilisateur/add", utilisateur, (reponse: any) => {
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table utilisateur. Réponse= ", reponse);
        this.onReset_add_utilisateur()
        alert("utilisateur ajouté avec succés")
      } else {
        console.log("L\'opération sur la table utilisateur a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_add_utilisateur = false;
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


  loading_get_structure: boolean = false
  les_structures: any
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


  loading_get_utilisateur:Boolean = false
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
