import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ScolariteComponent } from './scolarite/scolarite.component';
import { FinanceComponent } from './home/finance/finance.component';
import { RHComponent } from './rh/rh.component';
import { AdministrationComponent } from './administration/administration.component';
import { PedagogieComponent } from './pedagogie/pedagogie.component';
import { ProfilComponent } from './profil/profil.component';

@NgModule({
  declarations: [
    AppComponent,
    ScolariteComponent,
    FinanceComponent,
    RHComponent,
    AdministrationComponent,
    PedagogieComponent,
    ProfilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
