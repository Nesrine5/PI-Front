import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService2 } from 'app/services/file-upload-service2.service';
import { TokenStorageService } from 'app/services/users/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  fileUris: Array<string> = [];
  constructor(   private router: Router,private tokenStorageService: TokenStorageService,  private uploadService: FileUploadService2,) { }
  isLoggedIn = false;
  private roles: string[] = [];
  username?: string;
  UserId: number;
  ngOnInit(): void {
            //user
            this.isLoggedIn = !!this.tokenStorageService.getToken();

            if (this.isLoggedIn) {
              const user = this.tokenStorageService.getUser();
              this.roles = user.roles;
              this.username = user.username;
              this.UserId=user.id;
            }
            const user = this.tokenStorageService.getUser();
     //File 
     this.fileInfos = this.uploadService.getFiles(user.id);

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
          //this.fileInfos = this.uploadService.getFiles();
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
selectedImage: string | null = null;


openImageModal(imageUrl: string): void {
  this.selectedImage = imageUrl;
  // Trigger your modal opening logic here
  // You might want to use a modal library or create a custom modal component
}

goBack(): void {
  // Use the router to navigate back to the BesoinComponent
  this.router.navigate(['/home']);
}
}
