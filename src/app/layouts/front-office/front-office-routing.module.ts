import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';
import { BesoinDetailsComponent } from 'app/besoin-details/besoin-details.component';
import { AddLivrableComponent } from 'app/add-livrable/add-livrable.component';
import { EmailComponent } from 'app/email/email.component';
import { FilesComponent } from 'app/files/files.component';
import { HistoriqueComponent } from 'app/historique/historique.component';
import { HomeComponent } from 'app/home/home.component';
import { VideocallComponent } from 'app/videocall/videocall.component';
import { TestComponent } from 'app/test/test.component';
import { WebsocketComponent } from 'app/websocket/websocket.component';
import { ResultatComponent } from 'app/resultat/resultat.component';
const routes: Routes = [

  {path:'',component:FrontofficeComponent},
  { path: 'besoin-details/:besoinId/:UserId', component: BesoinDetailsComponent },
  { path: 'add-livrable/:besoinId', component: AddLivrableComponent },
  { path: 'email', component: EmailComponent },
  { path: 'files', component:FilesComponent},
  { path: 'historique', component:HistoriqueComponent},
  { path: 'home', component:HomeComponent},
  { path: 'videocall', component: VideocallComponent },
  { path: 'chat2', component: TestComponent },
  { path: 'web', component: WebsocketComponent },
  { path: 'resulat/:UserId', component: ResultatComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
