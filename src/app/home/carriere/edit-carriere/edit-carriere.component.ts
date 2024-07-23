
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-carriere',
  templateUrl: './edit-carriere.component.html',
  styleUrls: ['./edit-carriere.component.css']
})
export class EditCarriereComponent {
  reactiveForm_edit_carriere !: FormGroup;
  submitted: boolean = false
  loading_edit_carriere: boolean = false
  @Input()
  carriere_to_edit: any = {}
  @Output()
  cb_edit_carriere=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_carriere_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_carriere_form()
      this.update_form(this.carriere_to_edit)
  }
  // mise à jour du formulaire
  update_form(carriere_to_edit:any) {
      this.reactiveForm_edit_carriere = this.formBuilder.group({
          niveau : [carriere_to_edit.niveau, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_carriere .controls; }
  // validation du formulaire
  onSubmit_edit_carriere() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_carriere.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_carriere.invalid) {
          return;
      }
      var carriere = this.reactiveForm_edit_carriere.value
      this.edit_carriere({
      condition:JSON.stringify({id_carriere:this.carriere_to_edit.id_carriere}),
      data:JSON.stringify(carriere)
      })
  }
  // vider le formulaire
  onReset_edit_carriere() {
      this.submitted = false;
      this.reactiveForm_edit_carriere.reset();
  }
  edit_carriere(carriere: any) {
      this.loading_edit_carriere = true;
      this.api.taf_post("carriere/edit", carriere, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_carriere.emit({
                  new_data:JSON.parse(carriere.data)
              })
              console.log("Opération effectuée avec succés sur la table carriere. Réponse= ", reponse);
              this.onReset_edit_carriere()
              alert("Opération effectuée avec succés sur la table carriere")
          } else {
              console.log("L'opération sur la table carriere a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_carriere = false;
      }, (error: any) => {
          this.loading_edit_carriere = false;
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
