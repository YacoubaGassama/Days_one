
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-tache',
  templateUrl: './edit-tache.component.html',
  styleUrls: ['./edit-tache.component.css']
})
export class EditTacheComponent {
  reactiveForm_edit_tache !: FormGroup;
  submitted: boolean = false
  loading_edit_tache: boolean = false
  @Input()
  tache_to_edit: any = {}
  @Output()
  cb_edit_tache=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_tache_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) {

  }
  ngOnInit(): void {
      this.get_details_add_tache_form()
      this.update_form(this.tache_to_edit)
  }
  // mise à jour du formulaire
  update_form(tache_to_edit:any) {
      this.reactiveForm_edit_tache = this.formBuilder.group({
          nom : [tache_to_edit.nom, Validators.required],
          type : [tache_to_edit.type, Validators.required],
id_service : [tache_to_edit.id_service, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_tache .controls; }
  // validation du formulaire
  onSubmit_edit_tache() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_tache.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_tache.invalid) {
          return;
      }
      var tache = this.reactiveForm_edit_tache.value
      this.edit_tache({
      condition:JSON.stringify({id_tache:this.tache_to_edit.id_tache}),
      data:JSON.stringify(tache)
      })
  }
  // vider le formulaire
  onReset_edit_tache() {
      this.submitted = false;
      this.reactiveForm_edit_tache.reset();
  }
  edit_tache(tache: any) {
      this.loading_edit_tache = true;
      this.api.taf_post("tache/edit", tache, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_tache.emit({
                  new_data:JSON.parse(tache.data)
              })
              console.log("Opération effectuée avec succés sur la table tache. Réponse= ", reponse);
              this.onReset_edit_tache()
              alert("Opération effectuée avec succés sur la table tache")
          } else {
              console.log("L'opération sur la table tache a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_tache = false;
      }, (error: any) => {
          this.loading_edit_tache = false;
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
