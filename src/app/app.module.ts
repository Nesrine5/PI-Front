import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FrontOfficeModule } from './layouts/front-office/front-office.module';
import { BesoinDetailsComponent } from './besoin-details/besoin-details.component';
import { EmailComponent } from './email/email.component';
import { FilesComponent } from './files/files.component';
import { HistoriqueComponent } from './historique/historique.component';
import { AddBesoinComponent } from './add-besoin/add-besoin.component';
import { BesoinService } from './services/besoin.service';
import { LivrableService } from './services/livrable.service';
import { BesoinComponent } from './besoin/besoin.component';
import { AddLivrableComponent } from './add-livrable/add-livrable.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadService2 } from './services/file-upload-service2.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { LivrableComponent } from './livrable/livrable.component';
import { AddEvaluationComponent } from './add-evaluation/add-evaluation.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HomeComponent } from './home/home.component';
import { FileEvaluationComponent } from './file-evaluation/file-evaluation.component';
import { TestComponent } from './test/test.component';
import { VideocallComponent } from './videocall/videocall.component';
import { WebsocketComponent } from './websocket/websocket.component';
//import { NbButtonModule, NbCardModule } from '@nebular/theme';



import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import {CommonModule} from "@angular/common";
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ResultatComponent } from './resultat/resultat.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CalendarComponent } from './calendar/calendar.component';
const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatListModule
];
const config: SocketIoConfig = { url: 'http://localhost:8090', options: {} };
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FrontOfficeModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
     FormsModule,
     MatIconModule,
     MatDatepickerModule,
     MatInputModule,
     MatNativeDateModule,
     MatTableModule,
     MatInputModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatButtonModule,
     materialModules,
     MatDialogModule,
     MatPaginatorModule,
     //NbButtonModule,
     //NbCardModule,
     AngularFireModule.initializeApp({
      apiKey: "AIzaSyBBT9hVifth8Rqt40vWU6O3iklgihMQJsk",
      authDomain: "chat-ebce3-3b0fa.firebaseapp.com",
      projectId: "chat-ebce3",
      storageBucket: "chat-ebce3.appspot.com",
      messagingSenderId: "239606617073",
      appId: "1:239606617073:web:ebdfc071f91ecbf405ea50",
      measurementId: "G-TMDK39WRT9"  
    }),
    AngularFireStorageModule,
    CommonModule,
    SocketIoModule.forRoot(config),
  ],

  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddBesoinComponent,
    LivrableComponent,
    AddEvaluationComponent,
    EvaluationComponent,
    FileEvaluationComponent,
   // ResultatComponent,
   // TestComponent,
    //VideocallComponent,
    //WebsocketComponent,
    LoginComponent,
    ProfileComponent,
    CalendarComponent,
    //CalendarComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
