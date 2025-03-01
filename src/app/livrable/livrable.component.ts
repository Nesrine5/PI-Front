import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Livrable } from 'app/models/livrable';
import { EvaluationService } from 'app/services/evaluation.service';
import { LivrableService } from 'app/services/livrable.service';
import { ConfirmationDialogComponent } from 'app/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Besoin } from 'app/models/besoin';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FileUploadService2 } from 'app/services/file-upload-service2.service';
import { Observable } from 'rxjs';
import { Evaluation } from 'app/models/evaluation';

@Component({
  selector: 'app-livrable',
  templateUrl: './livrable.component.html',
  styleUrls: ['./livrable.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
  
})
export class LivrableComponent implements OnInit , AfterViewInit {
  displayedColumns: string[] = ['name', 'occupation', 'email', 'added', 'etat', 'rating','Manage'];
  //dataSource = new MatTableDataSource<any>(YOUR_DATA); // Replace YOUR_DATA with your actual data

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

 
  livrables: Livrable[];
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
    evaluations: [] ,
    files: [] ,
  };
  isEditing = false;


  fileInfos?: Observable<any>; selectedFiles?: FileList;
  
 
  constructor(private livrableService: LivrableService,private dialog: MatDialog, private uploadService: FileUploadService2,
    private route: ActivatedRoute,private evaluationService: EvaluationService) { }

  ngOnInit() {
    this.loadLivrables();
    this.route.params.subscribe(params => {
      this.evaluationId = +params['id'];
    });

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

     //File 
    // this.fileInfos = this.uploadService.getFiles();
  }
  ngAfterViewInit() {
    (function ($) {


      // Nice Select
     // $('.nice-select').niceSelect();
  
  
  })(jQuery) 
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
          evaluations: [] ,
          files: [] ,
          
        };
      },
      error => {
        console.error('Erreur lors de l\'ajout du livrable', error);
      }
    );
  }
  

 
  updateLivrable() {
    // Assuming you have a Livrable with an idLivrable property
    const updatedLivrable: Livrable = {
      idLivrable: this.nouveauLivrable.idLivrable,
      matricule: this.nouveauLivrable.matricule,
      nom: this.nouveauLivrable.nom,
      prenom: this.nouveauLivrable.prenom,
      etablissement: this.nouveauLivrable.etablissement,
      niveau: this.nouveauLivrable.niveau,
      phoneNumber: this.nouveauLivrable.phoneNumber,
      adresse: this.nouveauLivrable.adresse,
      ville: this.nouveauLivrable.ville,
      codePostal: this.nouveauLivrable.codePostal,
      email: this.nouveauLivrable.email,
      evaluations: this.nouveauLivrable.evaluations,
      files: this.nouveauLivrable.files,
  
    };
  
    this.livrableService.updateLivrable(updatedLivrable).subscribe(
      response => {
        console.log('Livrable mis à jour avec succès', response);
        this.loadLivrables();
        // Additional logic if needed after successful update
      },
      error => {
        console.error('Erreur lors de la mise à jour du livrable', error);
      }
    );
  }
  

  deleteLivrable(id: number) {
    this.livrableService.deleteLivrable(id).subscribe(
      response => {
        console.log('Livrable supprimé avec succès', response);
        this.loadLivrables();
      },
      error => {
        console.error('Erreur lors de la suppression du livrable', error);
      }
    );
  } 
   evaluationId: number;

   acceptEvaluation(evaluation: any): void {
    console.log('Evaluation object:', evaluation);
  
    if (evaluation && evaluation.idEvaluation) {
      const evaluationId = evaluation.idEvaluation; // Use the correct property name
      this.evaluationService.acceptEvaluation(evaluationId).subscribe(
        response => {
          console.log('Evaluation accepted successfully', response);
          // Update evaluation.etat or handle the response as needed
        },
        error => {
          console.error('Error accepting evaluation', error);
          // Handle the error appropriately
        }
      );
    } else {
      console.error('Invalid evaluation object:', evaluation);
      // Handle the case where the evaluation object or its ID is undefined or empty
    }
  }
  refuserEvaluation(evaluation: any): void {
    console.log('Evaluation object:', evaluation);

    if (!evaluation || !evaluation.idEvaluation) {
      console.error('Invalid evaluation object:', evaluation);
      // Handle the case where the evaluation object or its ID is undefined or empty
      return;
    }

    // Open a confirmation dialog
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Confirmation',
        message: 'Are you sure you want to refuse this evaluation?',
      },
    });

    // Subscribe to the dialog afterClosed event
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // User clicked 'Yes' in the confirmation dialog
        const evaluationId = evaluation.idEvaluation;
        this.evaluationService.refuserEvaluation(evaluationId).subscribe(
          (response) => {
            console.log('Evaluation refused successfully', response);
          },
          (error) => {
            console.error('Error refusing evaluation', error);
          }
        );
      } else {
        // User clicked 'No' or closed the dialog
        console.log('Evaluation refusal canceled');
      }
    });
  }


  //rating
  submitRating(rating: number) {
    const updatedEvaluation: Evaluation = {
      idEvaluation: this.evaluationId,
      starRating: rating,
      etat: '',
      date: undefined,
      besoin: new Besoin
    };

    this.evaluationService.updateEvaluation(this.evaluationId, updatedEvaluation)
        .subscribe(response => {
            // Handle successful submission if needed
        }, error => {
            // Handle error if needed
        });
}

dataSource: MatTableDataSource<any>;




}