import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { FrontofficeComponent } from './frontoffice/frontoffice.component';
import { BesoinComponent } from 'app/besoin/besoin.component';
import { BesoinDetailsComponent } from 'app/besoin-details/besoin-details.component';
import { AddLivrableComponent } from 'app/add-livrable/add-livrable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { EmailComponent } from 'app/email/email.component';
import { FilesComponent } from 'app/files/files.component';
import { HistoriqueComponent } from 'app/historique/historique.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmationDialogComponent } from 'app/confirmation-dialog/confirmation-dialog.component';
import { HomeComponent } from 'app/home/home.component';
import { TestComponent } from 'app/test/test.component';
import { VideocallComponent } from 'app/videocall/videocall.component';

import { PlyrModule } from 'ngx-plyr';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFireModule} from "@angular/fire/compat";
import { WebsocketComponent } from 'app/websocket/websocket.component';
import { MaterialModulee } from 'app/MaterialModule';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { ResultatComponent } from 'app/resultat/resultat.component';
import { AudioRecordingService } from 'app/services/AudioRecordingService';
import { AudioRecordingServicee } from 'app/services/audio-recording.service';
import { VideoRecordingService } from 'app/services/video-recording.service';
//audio
import { NgxAudioPlayerModule } from 'ngx-audio-player';
const materialModules = [
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatProgressBarModule,
  MatListModule,
  MatSidenavModule,
  MatPaginatorModule,
  //audio
  
  NgxAudioPlayerModule,
];
const config: SocketIoConfig = { url: 'http://localhost:8090', options: {} };
@NgModule({
  declarations: [
    FrontofficeComponent,
    BesoinComponent,

    BesoinDetailsComponent,
    AddLivrableComponent,
    EmailComponent,
    FilesComponent,

    HistoriqueComponent,
    ConfirmationDialogComponent,
    HomeComponent,
    TestComponent,
    VideocallComponent,
    WebsocketComponent,
    ResultatComponent

  ],
    
  
  imports: [
   // MatFileUploadModule
  // MaterialModulee,
  //PlyrModule,
    CommonModule,
    FrontOfficeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
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
     
     AngularFireModule.initializeApp({
      /*apiKey: "AIzaSyBBT9hVifth8Rqt40vWU6O3iklgihMQJsk",
      authDomain: "chat-ebce3-3b0fa.firebaseapp.com",
      projectId: "chat-ebce3",
      storageBucket: "chat-ebce3.appspot.com",
      messagingSenderId: "239606617073",
      appId: "1:239606617073:web:ebdfc071f91ecbf405ea50",
      measurementId: "G-TMDK39WRT9"  */
      apiKey: "AIzaSyBwj25k69QxiarVFfgO50KI2GZspGu6oM4",
      authDomain: "nesrine-347602.firebaseapp.com",
      projectId: "nesrine-347602",
      storageBucket: "nesrine-347602.appspot.com",
      messagingSenderId: "254963292451",
      appId: "1:254963292451:web:157690667b7b445104d496",
      measurementId: "G-LESQE2L9CL"
    }),
    AngularFireStorageModule,
    CommonModule,
    SocketIoModule.forRoot(config),
  ], providers: [AudioRecordingService,VideoRecordingService,AudioRecordingServicee]
})

export class FrontOfficeModule { }
