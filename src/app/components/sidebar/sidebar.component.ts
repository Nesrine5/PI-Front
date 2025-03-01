import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TokenStorageService } from 'app/services/users/token-storage.service';
import { filter } from 'rxjs';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
 // { path: '/table-list', title: 'Event',  icon:' bubble_chart', class: '' },
 // { path: '/typography', title: 'Forum',  icon:'content_paste', class: '' },
 // { path: '/icons', title: 'Blog',  icon:'library_books ', class: '' },
//  { path: '/maps', title: 'System Rep',  icon:'library_books', class: '' },
 //{ path: '/notifications', title: 'Innovation',  icon:'library_books', class: '' },
  { path: '/innovation', title: 'Innovation',  icon:'library_books', class: '' },
  { path: '/evaluation', title: 'Evaluation',  icon:'library_books', class: '' },
 // { path: '/upgrade', title: 'SITEWEB',  icon:'library_books', class: 'active-pro' },
  //{ path: '/besoin', title: 'Besoin',  icon: 'your-icon', class: '' },
  { path: '/besoin/:UserId', title: 'Besoin',  icon: 'library_books', class: '' },
 // { path: '/livrable', title: 'Livrable',  icon: 'your-icon', class: '' },
  // { path: '/fileEvaluation/:UserId', title: 'FileEvaluation',  icon: 'library_books', class: '' },
  { path: '/fileEvaluation', title: 'FileEvaluation',  icon: 'library_books', class: '' },
  { path: '/email', title: 'Email',  icon: 'library_books', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  title = 'Project-Angular';
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;
  constructor(private route: ActivatedRoute,private tokenStorageService: TokenStorageService,private router: Router) { }

  ngOnInit() {
      // Subscribe to router events to get the UserId from route parameters when the route changes

    //user
   
    
    let UserId: number;
    this.route.params.subscribe(params => {
       this.initializeComponent();
      UserId = +params['UserId'];
      this.navigateToFileEvaluation(UserId);
      console.log('User ID:', UserId);
    });
   // this.navigateToFileEvaluation(this.UserId);
        //user
        //this.initializeComponent();
      /*  let UserId: number;
        this.route.params.subscribe(params => {
          this.initializeComponent();
          UserId = +params['UserId'];
          console.log('User ID:', UserId);
        });*/
    this.menuItems = ROUTES.filter(menuItem => menuItem);

    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
      this.UserId=user.id;
    }

  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  navigateToDetails( UserId: number): void {
    this.initializeComponent();
    console.log('Navigating to besoin for User ID:', UserId);
   const a= this.router.navigate(['/besoin',UserId]);
   
  }

  navigateToFileEvaluation( UserId: number): void {
   // this.initializeComponent();
   this.initializeComponent();
    console.log('Navigating to fileEvaluation for User ID:', UserId);
   const a= this.router.navigate(['/fileEvaluation',UserId]);
   
  }
  logout(): void {
    this.tokenStorageService.signOut();
   // window.location.reload();
    this.router.navigate(['/login']);
  }
  //user
private initializeComponent(): void {
  // Example initialization logic
  const token = this.tokenStorageService.getToken();
  const user = this.tokenStorageService.getUser();

  console.log('Token:', token);
  console.log('User:', user);
}
UserId: number;
navigateTo(menuItem: RouteInfo): void {
  if (menuItem.title === 'Besoin') {
      this.navigateToDetails(this.UserId); // Pass the appropriate UserId here
  } else if (menuItem.title === 'FileEvaluation') {
      this.navigateToFileEvaluation(this.UserId); // Pass the appropriate UserId here
  }
}
}
