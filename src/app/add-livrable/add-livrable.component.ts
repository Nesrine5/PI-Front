import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FileDetails } from 'app/models/fileDetails';
import { Livrable } from 'app/models/livrable';
import { FileUploadService } from 'app/services/file-upload.service';
import { LivrableService } from 'app/services/livrable.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder} from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';

import { HttpEventType, HttpResponse } from '@angular/common/http';

import { FileUploadService2 } from 'app/services/file-upload-service2.service';
import { EmailService } from 'app/services/email.service';
import { EmailRequest } from 'app/models/EmailRequest';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Portal } from '@angular/cdk/portal';
import { MatSidenav } from '@angular/material/sidenav';
import { SidenavService } from 'app/services/SidenavService';
@Component({
  selector: 'app-add-livrable',
  templateUrl: './add-livrable.component.html',
  styleUrls: ['./add-livrable.component.css']
})
export class AddLivrableComponent implements OnInit {
  activeTab: string = 'emaill'; // Set default active tab
  livrables: any[];
  file!: File;
  fileDetails!: FileDetails;
  fileUris: Array<string> = [];
  nouveauLivrable: Livrable = {
    matricule: '',
     nom: '',
    prenom: '',
    etablissement: '',
     niveau: '',
    phoneNumber: '',
    adresse: '',
    ville: '',
    codePostal: '',
    email:'',
    evaluations: null,
    files: [] ,
  };
  isEditing = false;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    private livrableService: LivrableService,
    private router: Router,
    private uploadService: FileUploadService2,
    public viewContainerRef: ViewContainerRef,
    private emailService: EmailService,
    private breakpointObserver: BreakpointObserver,
     private sidenavService: SidenavService) {}

  livrableForm!: FormGroup;
  ngOnInit() {
    this.livrableForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],});
    this.loadLivrables();
    // Retrieve the Besoin ID from the route
    this.route.params.subscribe(params => {
      const besoinId = +params['besoinId']; // '+' is used to convert the string to a number
      console.log('Besoin ID:', besoinId);

     //File 
    // this.fileInfos = this.uploadService.getFiles();


     this.sidenavService.setSidePanel( this.sidePanel);
    });
  }


  goBack(): void {
    // Use the router to navigate back to the BesoinComponent
    this.router.navigate(['/innovation']);
  }
  
  loadLivrables() {
    this.livrableService.getAllLivrables().subscribe(
      data => {
        this.livrables = data;
      },
      error => {
        console.error('Erreur lors du chargement des livrables', error);
      }
    );
  }
  saveLivrable() {
    // Fill newLivrable with the actual form data
    const newLivrable: Livrable = {
      matricule: this.nouveauLivrable.matricule,
      nom: this.nouveauLivrable.nom,
      prenom: this.nouveauLivrable.prenom,
      etablissement: this.nouveauLivrable.etablissement,
       niveau: this.nouveauLivrable. niveau,
      phoneNumber: this.nouveauLivrable.phoneNumber,
      adresse: this.nouveauLivrable. adresse,
      ville: this.nouveauLivrable.ville,
      codePostal: this.nouveauLivrable.codePostal,
      email: this.nouveauLivrable.email,
      evaluations: this.nouveauLivrable.evaluations,
      files: this.nouveauLivrable.files,
    };
  
    this.livrableService.saveLivrable(newLivrable).subscribe(
      response => {
        console.log('Livrable ajouté avec succès', response);
        this.loadLivrables();
        // Clear the form after successful submission if needed
        this.nouveauLivrable = {
          matricule: '',
          nom: '',
          prenom: '',
          etablissement: '',
          niveau: '',
          phoneNumber: '',
           adresse: '',
          ville: '',
          codePostal: '',
          email:'',
          evaluations: null,
          files: [] ,

   
        };
      },
      error => {
        console.error('Erreur lors de l\'ajout du livrable', error);
      }
    );
  }
 /* selectFile(event: any) {
    this.file = event.target.files.item(0);
  }

  uploadFile() {
    this.fileUploadService.upload(this.file).subscribe({
      next: (data) => {
        this.fileDetails = data;
        this.fileUris.push(this.fileDetails.fileUri);
        alert("File Uploaded Successfully")
        console.log('File Uploaded Successfully');
        console.log('Image URLs:', this.fileUris);
        console.log('Livrable Saved:', data);
      },
      error: (e) => {
        console.log(e);
      }
    });
  }*/
  //livrableForm!: FormGroup;
  saveLivrable2(){
    const newLivrable: Livrable = {
      matricule: this.nouveauLivrable.matricule,
      nom: this.nouveauLivrable.nom,
      prenom: this.nouveauLivrable.prenom,
      etablissement: this.nouveauLivrable.etablissement,
       niveau: this.nouveauLivrable. niveau,
      phoneNumber: this.nouveauLivrable.phoneNumber,
      adresse: this.nouveauLivrable. adresse,
      ville: this.nouveauLivrable.ville,
      codePostal: this.nouveauLivrable.codePostal,
      email: this.nouveauLivrable.email,
      evaluations: this.nouveauLivrable.evaluations,
      files: this.nouveauLivrable.files,
    };
  
      this.route.params.subscribe(params => {
        const besoinId = +params['besoinId'];
        console.log('Besoin ID:', besoinId);
  
        this.livrableService.saveLivrableAndAddIDLivrableAndIdBesoinInEnovation(newLivrable, besoinId)
          .subscribe(savedLivrable => {
           // this.saveLivrable();
            console.log('Livrable saved successfully:', savedLivrable);
            this.loadLivrables();
          }, error => {
            console.error('Error saving Livrable:', error);
            // Handle error
          });
      });
    
  }


//File
currentFile?: File;
progress = 0;
message = '';

fileName = 'Select File';
fileInfos?: Observable<any>; selectedFiles?: FileList;


selectFile(event: any): void {
  if (event.target.files && event.target.files[0]) {
    const file: File = event.target.files[0];
    this.currentFile = file;
    this.fileName = this.currentFile.name;
  } else {
    this.fileName = 'Select File';
  }
}

upload(): void {
  this.progress = 0;
  this.message = "";

  if (this.currentFile) {
    this.uploadService.upload(this.currentFile).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
         // this.fileInfos = this.uploadService.getFiles();
        }
      },
      (err: any) => {
        console.log(err);
        this.progress = 0;

        if (err.error && err.error.message) {
          this.message = err.error.message;
        } else {
          this.message = 'Could not upload the file!';
        }

        this.currentFile = undefined;
      });
  }



}


//email


emailRequest: EmailRequest = { to: '', subject: '', body: '' };

sendEmail() {
  this.emailService.sendEmail(this.emailRequest).subscribe(
    response => {
      console.log(response); // Handle success response
    },
    error => {
      console.error(error); // Handle error response
    }
  );
}



isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));

  @ViewChild('panel', { static: true }) private sidePanel: MatSidenav;

 
  get selectedPortal(): Portal<any> {
    return this.sidenavService.selectedPortal;
  }
  selectedTab: string = 'account';

  // Function to update the selected tab when a tab is clicked
  selectTab(tab: string): void {
    this.selectedTab = tab;
  }



  // Use the router.navigate method to navigate to '/email'
  goToEmail() {
    this.router.navigate(['/email']);
  }
  goToFiles() {
    this.router.navigate(['/files']);
  }
  goTohistorical() {
    this.router.navigate(['/historique']);
  }

  
}

