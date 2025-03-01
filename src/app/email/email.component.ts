import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailRequest } from 'app/models/EmailRequest';
import { EmailService } from 'app/services/email.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor( private router: Router,  private emailService: EmailService,) { }

  ngOnInit(): void {
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
goBack(): void {
  // Use the router to navigate back to the BesoinComponent
  this.router.navigate(['/home']);
}

}
