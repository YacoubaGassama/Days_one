
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-demande',
  templateUrl: './edit-demande.component.html',
  styleUrls: ['./edit-demande.component.css']
})
export class EditDemandeComponent {
  reactiveForm_edit_demande !: FormGroup;
  submitted: boolean = false
  loading_edit_demande: boolean = false
  @Input()
  demande_to_edit: any = {}
  @Output()
  cb_edit_demande=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_demande_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_demande_form()
      this.update_form(this.demande_to_edit)
  }
  // mise à jour du formulaire
  update_form(demande_to_edit:any) {
      this.reactiveForm_edit_demande = this.formBuilder.group({
          type : [demande_to_edit.type, Validators.required],
etat : [demande_to_edit.etat, Validators.required],
demandeur : [demande_to_edit.demandeur, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_demande .controls; }
  // validation du formulaire
  onSubmit_edit_demande() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_demande.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_demande.invalid) {
          return;
      }
      var demande = this.reactiveForm_edit_demande.value
      this.edit_demande({
      condition:JSON.stringify({id_demande:this.demande_to_edit.id_demande}),
      data:JSON.stringify(demande)
      })
  }
  // vider le formulaire
  onReset_edit_demande() {
      this.submitted = false;
      this.reactiveForm_edit_demande.reset();
  }
  edit_demande(demande: any) {
      this.loading_edit_demande = true;
      this.api.taf_post("demande/edit", demande, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_demande.emit({
                  new_data:JSON.parse(demande.data)
              })
              console.log("Opération effectuée avec succés sur la table demande. Réponse= ", reponse);
              this.onReset_edit_demande()
              alert("Opération effectuée avec succés sur la table demande")
          } else {
              console.log("L'opération sur la table demande a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_demande = false;
      }, (error: any) => {
          this.loading_edit_demande = false;
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
