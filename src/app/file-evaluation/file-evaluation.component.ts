import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Files } from 'app/models/files';
import { FileUploadService2 } from 'app/services/file-upload-service2.service';
import { Observable, forkJoin } from 'rxjs';
import Chart from 'chart.js/auto';
import { EvaluationService } from 'app/services/evaluation.service';
import { TokenStorageService } from 'app/services/users/token-storage.service';
import { Chat } from 'app/models/chat/chat';
import { Chat2Service } from 'app/services/chat/chat2.service';
@Component({
  selector: 'app-file-evaluation',
  templateUrl: './file-evaluation.component.html',
  styleUrls: ['./file-evaluation.component.css']
})
export class FileEvaluationComponent implements OnInit {
  fileUris: Array<string> = [];
  name: string;
  constructor(private chatService: Chat2Service,private tokenStorageService: TokenStorageService,  private router: Router,private route: ActivatedRoute, private evaluationService:EvaluationService,  private uploadService: FileUploadService2) { }

  ngOnInit(): void {
    //user
    this.initializeComponent();
    let UserId: number;
    this.route.params.subscribe(params => {
      UserId = +params['UserId'];
      console.log('User ID:', UserId);
    });
    const user = this.tokenStorageService.getUser();
    //File 
    this.fileInfos = this.uploadService.getFiles(user.id);
  


  }
  refreshPage(): void {
    window.location.reload();
  }
  
  // Assuming fileInfos is an array of objects with livrableNote property
filteredFileInfos: any[]; // Define a new array to hold filtered file infos

filterFileInfosByNote(): void {
  // Subscribe to the fileInfos Observable to get the latest data
  this.fileInfos.subscribe(data => {
    // Filter fileInfos array to include only items with livrableNote between 1 and 20
    this.filteredFileInfos = data.filter(file => file.livrableNote >= 1 && file.livrableNote <= 20);
  });
}


  loadFileInfos(): void {
    const user = this.tokenStorageService.getUser();
    let UserId: number;
    // Assuming you are fetching file infos from a service
    this.uploadService.getFiles(user.id).subscribe(data => {
      this.fileInfos = data;
      this.filterFileInfosByNote(); // Apply filter after data is loaded
    });
  }


  setFileIdAndNote(file: Files): void {
    this.fileId = file.fileId; // Assuming 'id' is the property that holds the fileId
    this.livrableNom= file.livrableNom;

    this.updatedNote = file.livrableNote;
  }
  
  onFileSelected(fileId: string): void {
    this.getFileDetails(fileId);
  }
  getFileDetails(fileId: string): void {
    this.uploadService.getFileById(fileId).subscribe(
      (response) => {
        this.file = response;
        this.fileId = fileId;

      },
      (error) => {
        console.error('Error fetching file details:', error);
      }
    );
  }


//File
currentFile?: File;
progress = 0;
message = '';

fileName = 'Select File';
fileInfos?: Observable<any>;
 selectedFiles?: FileList;


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
          let UserId: number;
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles(UserId);
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
file: Files;
updatedNote: number;
fileId: string;
livrableNom: string;
username?: string;
updateLivrableNote() {
  console.log('fileId:', this.fileId);
  console.log('updatedNote:', this.updatedNote);
  console.log('livrableNom:', this.livrableNom);
  const user = this.tokenStorageService.getUser();
 this.uploadService.getFiles(user.id).subscribe(
    (data) => {
      this.file = data;
      console.log("hi",this.file);
      //this.chatId = this.chatData.chatId;
     // sessionStorage.setItem("chatId", this.chatData.chatId);
    });

  const newChat: Chat = {
    id: 0,
    chatId: undefined,
   // fileId
    firstUserName:   this.livrableNom,
    secondUserName: user.username
  };
  this.chatService.createChatRoom(newChat).subscribe(
    (data) => {
    });
  if (this.fileId && this.updatedNote !== undefined) {
    this.uploadService.updateLivrableNote(this.fileId, this.updatedNote).subscribe(
      (response) => {

 
      

        console.log('Livrable Note updated successfully:', response);
      },
      (error) => {
        console.error('Error updating Livrable Note:', error);
      }
    );
  } else {
    console.error('File ID or updated note is missing.');
  }
 // this.refreshPage();
}
searchTerm: string;
searchSynonyms() {
  let UserId: number;
  const user = this.tokenStorageService.getUser();
  this.uploadService.getFiles(user.id).subscribe((off) => {
    this.fileInfos = off.filter((fileInfos: any) =>
    fileInfos.livrablePrenom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    fileInfos.livrableNom.toString().includes(this.searchTerm) ||
    fileInfos.name.toString().includes(this.searchTerm)
    );
  });
}
chart:any;
createChart() {
  const states = ['En Court', 'ACCEPATER', 'REFUSER'];

  // Fetch counts for each state
  const observables = states.map(state => this.evaluationService.filterByEtat(state));

  // Combine multiple observables into one
  forkJoin(observables).subscribe(data => {
    const counts = data.map(applications => applications.length);

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: states,
        datasets: [
          {
            label: "Etat De la Demande",
            data: counts,
            borderColor: 'gray',
            borderWidth: 1,
            fill: false
          }
        ]
      },
      options: {
        aspectRatio: 3.5
      }
    });
  });
}


/*filterByEtat(etat: string): void {
  this.selectedEtat = etat;
  if (etat.length==0){
    this.fetchDemandes();
  }
  else{
  this.evaluationService.filterByEtat(etat).subscribe(
    (data) => {
      this.demandes = data;
    },
    (error) => {
      console.error(error);
    }
  );}
}*/

//user
private initializeComponent(): void {
  // Example initialization logic
  const token = this.tokenStorageService.getToken();
  const user = this.tokenStorageService.getUser();

  console.log('Token:', token);
  console.log('User:', user);
}



}
