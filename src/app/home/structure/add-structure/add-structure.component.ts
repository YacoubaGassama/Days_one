
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-add-structure',
  templateUrl: './add-structure.component.html',
  styleUrls: ['./add-structure.component.css']
})
export class AddStructureComponent {
  @Output()
  cb_add_structure=new EventEmitter()
  reactiveForm_add_structure !: FormGroup;
  submitted:boolean=false
  loading_add_structure :boolean=false
  form_details: any = {}
  loading_get_details_add_structure_form = false
  constructor(private formBuilder: FormBuilder,public api:ApiService) { }

  ngOnInit(): void {
      this.get_details_add_structure_form()
      this.init_form()
  }
  init_form() {
      this.reactiveForm_add_structure  = this.formBuilder.group({
          nom: ["", Validators.required]
      });
  }

  // acces facile au champs de votre formulaire
  get f(): any { return this.reactiveForm_add_structure .controls; }
  // validation du formulaire
  onSubmit_add_structure () {
      this.submitted = true;
      console.log(this.reactiveForm_add_structure .value)
      // stop here if form is invalid
      if (this.reactiveForm_add_structure .invalid) {
          return;
      }
      var structure =this.reactiveForm_add_structure .value
      this.add_structure (structure )
  }
  // vider le formulaire
  onReset_add_structure () {
      this.submitted = false;
      this.reactiveForm_add_structure .reset();
  }
  add_structure(structure: any) {
      this.loading_add_structure = true;
      this.api.taf_post("structure/add", structure, (reponse: any) => {
      this.loading_add_structure = false;
      if (reponse.status) {
          console.log("Opération effectuée avec succés sur la table structure. Réponse= ", reponse);
          this.onReset_add_structure()
          alert("Opération éffectuée avec succés")
          this.cb_add_structure.emit({
            status:true,
            structure:reponse.data
          })
      } else {
          console.log("L'opération sur la table structure a échoué. Réponse= ", reponse);
          alert("L'opération a echoué")
      }
    }, (error: any) => {
        this.loading_add_structure = false;
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
