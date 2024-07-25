
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrls: ['./add-tache.component.css']
})
export class AddTacheComponent {
  @Output()
  cb_add_tache = new EventEmitter()
  @Input() service!: number
  reactiveForm_add_tache !: FormGroup;
  submitted: boolean = false
  loading_add_tache: boolean = false
  form_details: any = {}
  loading_get_details_add_tache_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { }

  ngOnInit(): void {
    this.get_details_add_tache_form()
    this.init_form()
  }
  init_form() {
    if(this.service != undefined){
      this.reactiveForm_add_tache = this.formBuilder.group({
        nom: ["", Validators.required],
        lien: ["", Validators.required],
        id_service: [this.service, Validators.required]
      });
    }else{
      this.reactiveForm_add_tache = this.formBuilder.group({
        nom: ["", Validators.required],
        lien: ["", Validators.required],
        id_service: ["", Validators.required]
      });
    }
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_tache.controls; }
  // validation du formulaire
  onSubmit_add_tache() {
    this.submitted = true;
    console.log(this.reactiveForm_add_tache.value)
    // stop here if form is invalid
    if (this.reactiveForm_add_tache.invalid) {
      return;
    }
    var tache = this.reactiveForm_add_tache.value
    this.add_tache(tache)
  }
  // vider le formulaire
  onReset_add_tache() {
    this.submitted = false;
    this.reactiveForm_add_tache.reset();
  }
  add_tache(tache: any) {
    this.loading_add_tache = true;
    this.api.taf_post("tache/add", tache, (reponse: any) => {
      if (reponse.status) {
        console.log("Opération effectuée avec succés sur la table tache. Réponse= ", reponse);
        this.onReset_add_tache()
        alert("tache ajouté avec succés")
      } else {
        console.log("L\'opération sur la table tache a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_add_tache = false;
    }, (error: any) => {
      this.loading_add_tache = false;
    })
  }
  get_details_add_tache_form() {
    this.loading_get_details_add_tache_form = true;
    this.api.taf_post("tache/get_form_details", {}, (reponse: any) => {
      if (reponse.status) {
        this.form_details = reponse.data
        console.log("Opération effectuée avec succés sur la table tache. Réponse= ", reponse);
      } else {
        console.log("L'opération sur la table tache a échoué. Réponse= ", reponse);
        alert("L'opération a echoué")
      }
      this.loading_get_details_add_tache_form = false;
    }, (error: any) => {
      this.loading_get_details_add_tache_form = false;
    })
  }
}
