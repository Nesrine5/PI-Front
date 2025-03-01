import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService2 } from 'app/services/file-upload-service2.service';
import { TokenStorageService } from 'app/services/users/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private tokenStorageService: TokenStorageService,   private router: Router,) { }
  isLoggedIn = false;
  private roles: string[] = [];
  username?: string;
  UserId: number;

  ngOnInit(): void {

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.UserId=user.id;
    }
 
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
  goBack(): void {
    // Use the router to navigate back to the BesoinComponent
    this.router.navigate(['/front']);
  }

  goToChat() {
    this.router.navigate(['/chat2']);
  }

  goToResulat( UserId: number): void {
    this.router.navigate(['/resulat',UserId]);
  }


}
