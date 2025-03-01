import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BesoinService } from 'app/services/besoin.service';
import { FileUploadService2 } from 'app/services/file-upload-service2.service';
import { TokenStorageService } from 'app/services/users/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-besoin-details',
  templateUrl: './besoin-details.component.html',
  styleUrls: ['./besoin-details.component.css']
})
export class BesoinDetailsComponent implements OnInit {
  fileUris: Array<string> = [];
  selectedBesoin: any;
  constructor(private tokenStorageService: TokenStorageService,private route: ActivatedRoute, 
    private besoinService: BesoinService,
    private router: Router ,private uploadService: FileUploadService2) { }

  ngOnInit(): void {
    this.initializeComponent();
    this.route.params.subscribe(params => {
      const besoinId = +params['besoinId']; // convert to number

      // Fetch the details of the selected besoin using the service
      this.besoinService.getBesoinDetails(besoinId).subscribe(
        (details: any) => {
          this.selectedBesoin = details;
        },
        error => {
          console.error('Error fetching besoin details:', error);
        }
      );
    });
   // this.fileInfos = this.uploadService.getFiles();
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
besoinId: number = 0;

upload(): void {
  this.progress = 0;
  this.message = "";
  
  if (this.currentFile) {
    this.route.params.subscribe(params => {
    const besoinId = +params['besoinId'];
    //const user = this.tokenStorageService.getUser();
    const UserId = +params['UserId'];
    console.log('Besoin ID:', besoinId);
    console.log('User ID:', UserId);
    this.uploadService.upload2(this.currentFile,besoinId,UserId).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
         // this.fileInfos = this.uploadService.getFiles();
         this.router.navigate(['/historique']);
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
  )};


}
selectedImage: string | null = null;


openImageModal(imageUrl: string): void {
  this.selectedImage = imageUrl;
  // Trigger your modal opening logic here
  // You might want to use a modal library or create a custom modal component
}



// Rating
updateRating(id: number, newRating: number) {
  this.besoinService.updateRating(id, newRating)
    .subscribe(response => {
      // Handle successful update if needed
      console.log('Rating updated successfully:', response);

      // Assuming this.selectedBesoin is the currently selected Besoin,
      // you might want to update the local selectedBesoin's rating
      this.selectedBesoin.starRating = newRating;

      // If you want to refresh the evaluations list, call the method to reload the data
      // this.loadEvaluations();

    }, error => {
      // Handle error if needed
      console.error('Error updating rating:', error);
    });
}
goBack(): void {
  // Use the router to navigate back to the BesoinComponent
  this.router.navigate(['/front']);
}

private initializeComponent(): void {
  // Example initialization logic
  const token = this.tokenStorageService.getToken();
  const user = this.tokenStorageService.getUser();

  console.log('Token:', token);
  console.log('User:', user);
}

}