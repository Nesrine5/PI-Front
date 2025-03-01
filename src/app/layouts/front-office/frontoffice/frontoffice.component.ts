import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'app/services/users/token-storage.service';

@Component({
  selector: 'app-frontoffice',
  templateUrl: './frontoffice.component.html',
  styleUrls: ['./frontoffice.component.css']
})
export class FrontofficeComponent implements OnInit {
  title = 'Project-Angular';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;

  constructor(private router: Router,private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }
  }
  openAdminWindow() {
    // Define the URL you want to open in a new window
    const adminUrl = 'http://localhost:4200/#/dashboard';
    
    // Open the URL in a new window
    window.open(adminUrl, '_blank');
  }
  logout(): void {
    this.tokenStorageService.signOut();
   // window.location.reload();
    this.router.navigate(['/login']);
  }
}
