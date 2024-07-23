
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-edit-structure',
  templateUrl: './edit-structure.component.html',
  styleUrls: ['./edit-structure.component.css']
})
export class EditStructureComponent {
  reactiveForm_edit_structure !: FormGroup;
  submitted: boolean = false
  loading_edit_structure: boolean = false
  @Input()
  structure_to_edit: any = {}
  @Output()
  cb_edit_structure=new EventEmitter()
  form_details: any = {}
  loading_get_details_add_structure_form = false
  constructor(private formBuilder: FormBuilder, public api: ApiService) { 
      
  }
  ngOnInit(): void {
      this.get_details_add_structure_form()
      this.update_form(this.structure_to_edit)
  }
  // mise à jour du formulaire
  update_form(structure_to_edit:any) {
      this.reactiveForm_edit_structure = this.formBuilder.group({
          nom : [structure_to_edit.nom, Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_edit_structure .controls; }
  // validation du formulaire
  onSubmit_edit_structure() {
      this.submitted = true;
      console.log(this.reactiveForm_edit_structure.value)
      // stop here if form is invalid
      if (this.reactiveForm_edit_structure.invalid) {
          return;
      }
      var structure = this.reactiveForm_edit_structure.value
      this.edit_structure({
      condition:JSON.stringify({id_structure:this.structure_to_edit.id_structure}),
      data:JSON.stringify(structure)
      })
  }
  // vider le formulaire
  onReset_edit_structure() {
      this.submitted = false;
      this.reactiveForm_edit_structure.reset();
  }
  edit_structure(structure: any) {
      this.loading_edit_structure = true;
      this.api.taf_post("structure/edit", structure, (reponse: any) => {
          if (reponse.status) {
              this.cb_edit_structure.emit({
                  new_data:JSON.parse(structure.data)
              })
              console.log("Opération effectuée avec succés sur la table structure. Réponse= ", reponse);
              this.onReset_edit_structure()
              alert("Opération effectuée avec succés sur la table structure")
          } else {
              console.log("L'opération sur la table structure a échoué. Réponse= ", reponse);
              alert("L'opération a echoué")
          }
          this.loading_edit_structure = false;
      }, (error: any) => {
          this.loading_edit_structure = false;
      })
  }
  get_details_add_structure_form() {
      this.loading_get_details_add_structure_form = true;
      this.api.taf_post("structure/get_form_details", {}, (reponse: any) => {
        if (reponse.status) {
          this.form_details = reponse.data
          console.log("Opération effectuée avec succés sur la table structure. Réponse= ", reponse);
        } else {
          console.log("L'opération sur la table structure a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
        }
        this.loading_get_details_add_structure_form = false;
      }, (error: any) => {
      this.loading_get_details_add_structure_form = false;
    })
  }
}
