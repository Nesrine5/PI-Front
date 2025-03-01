import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Besoin } from 'app/models/besoin';
import { FileHandle } from 'app/models/file-handle.model';
import { Router } from '@angular/router';
import { BesoinService } from 'app/services/besoin.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TokenStorageService } from 'app/services/users/token-storage.service';
import { User } from 'app/models/chat/user';

@Component({
  selector: 'app-besoin',
  templateUrl: './besoin.component.html',
  styleUrls: ['./besoin.component.css'],
  animations: [
    trigger('buttonAnimation', [
      state('idle', style({
        transform: 'scale(1)',
      })),
      state('hovered', style({
        transform: 'scale(1.1)',
      })),
      transition('idle <=> hovered', animate('200ms ease-in-out')),
    ]),
  ],
})
export class BesoinComponent implements OnInit {

  besoins: any[];
  selectedBesoin: Besoin | null = null;
  //selectedUser: User | null = null;




  constructor(private tokenStorageService: TokenStorageService, private besoinService: BesoinService, private fb: FormBuilder, private  sanitizer: DomSanitizer,private router: Router ) {
 
  }

 
  ngOnInit(): void  {
    const user = this.tokenStorageService.getUser();
    this.loadBesoins();
 

    this.initializeComponent();
  }

  

  

  loadBesoins(): void {
    this.besoinService.getAllBesoins().subscribe(data => {
      this.besoins = data;
    },
    error => {
      console.error('Erreur lors du chargement des livrables', error);
    }
  );
}

selectBesoin(besoin: Besoin): void {
  console.log('Selected Besoin:', besoin);
  this.selectedBesoin = { ...besoin };
}


user?: User | null;

navigateToDetails(besoinId: number, UserId: number): void {
  this.user = this.tokenStorageService.getUser();
  console.log('Navigating to details for Besoin ID:', besoinId);
  console.log('Navigating to details for User ID:', UserId);
  console.log('Selected Besoin:', this.selectedBesoin);
  console.log('Selected User:', this.user);
    this.router.navigate(['/besoin-details', besoinId, UserId]);
 
}
private initializeComponent(): void {
  // Example initialization logic
  const token = this.tokenStorageService.getToken();
  const user = this.tokenStorageService.getUser();

  console.log('Token:', token);
  console.log('User:', user);
  this.user = this.tokenStorageService.getUser();
}

navigateToHome() {
  this.router.navigate(['/home' ]);
}


  
}