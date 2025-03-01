import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService2 } from 'app/services/file-upload-service2.service';
import { TokenStorageService } from 'app/services/users/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resultat',
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent implements OnInit {
  fileInfos?: Observable<any>;
  constructor(private router: Router,private route: ActivatedRoute,private tokenStorageService: TokenStorageService, private uploadService: FileUploadService2,) { }
  isLoggedIn = false;
  private roles: string[] = [];
  username?: string;
  UserId: number;
  ngOnInit(): void {
  
    let UserId: number;
  //user
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.UserId=user.id;
    }

    if (this.isLoggedIn) {
      // Get user information
      const user = this.tokenStorageService.getUser();
      
      // Assign ShareData with user data
      this.shareData = {
        url: 'https://github.com/husseinAbdElaziz',
        description: 'dev',
        tags: user.username,
      };
    } else {
      // If user is not logged in, initialize ShareData with default values
      this.shareData = {
        url: 'https://github.com/husseinAbdElaziz',
        description: 'dev',
        tags: '',
      };
    }

    this.route.params.subscribe(params => {
      UserId = +params['UserId'];
      console.log('User ID:', UserId);
    });
     //File 
     const user = this.tokenStorageService.getUser();
      
     this.fileInfos = this.uploadService.getFiles(UserId);
     console.log(this.fileInfos);
  
  }
  containerStyle = {};
  openButtonStyle = {};
  envelopeTopStyle = {};
  perspectiveStyle = {};
  h2Style = {};

  @HostListener('window:scroll', [])
  onScroll() {
    const scr = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (scr >= 100) {
      this.containerStyle = {
        'transition': 'all 1s',
        'transform': 'rotateY(180deg)'
      };
      this.openButtonStyle = {
        'transition': 'all 1s .5s',
        'transform': 'rotateX(180deg)',
        'z-index': '0'
      };
    } else {
      this.containerStyle = {
        'transition': 'all 1s .5s',
        'transform': 'rotateY(0deg)'
      };
      this.openButtonStyle = {
        'transition': 'all 1s',
        'transform': 'rotateX(0deg)',
        'z-index': '10'
      };
    }

    if (scr >= 500) {
      this.envelopeTopStyle = {
        'transition': 'all .5s 1s',
        'top': '-550px',
        'height': '500px'
      };
      this.perspectiveStyle = {
        'transition': 'all 1s',
        'transform': 'translateY(450px)'
      };
      this.h2Style = {
        'transition': 'all 1s',
        'transform': 'rotateZ(180deg)'
      };
    } else {
      this.envelopeTopStyle = {
        'transition': 'all .5s',
        'top': '3px',
        'height': '200px'
      };
      this.perspectiveStyle = {
        'transform': 'translateY(0px)'
      };
      this.h2Style = {
        'transform': 'rotateZ(0deg)'
      };
    }
  }

  //user
private initializeComponent(): void {
  // Example initialization logic
  const token = this.tokenStorageService.getToken();
  const user = this.tokenStorageService.getUser();

  console.log('Token:', token);
  console.log('User:', user);
}
goBack(): void {
  // Use the router to navigate back to the BesoinComponent
  this.router.navigate(['/home']);
}









//FB

shareData: ShareData = {
  url: 'https://github.com/Nesrine5',
  description: 'dev',
  tags: 'Oumaima',
};

shareLinks: ShareLinks[] = [
  {
    title: 'fb',
    link: `https://www.facebook.com/sharer.php?u=${this.shareData?.url}`,
  },
  {
    title: 'twitter',
    link: `https://twitter.com/intent/tweet?url=${this.shareData?.url}&text=${this.shareData?.description}&hashtags=${this.shareData?.tags}`,
  },
  {
    title: 'pinterest',
    link: `http://pinterest.com/pin/create/link/?url=${this.shareData?.url}`,
  },
  {
    title: 'whatsapp',
    link: `https://wa.me?text=${this.shareData?.url}`,
  },

];




}
//FB

type ShareData = { url: string; description: string; tags: string };
type ShareLinks = { title: string; link: string };