import { Component, OnInit } from '@angular/core';
import { Evaluation } from 'app/models/evaluation';
import { EvaluationService } from 'app/services/evaluation.service';
import { Chart } from 'chart.js';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {

  evaluations: Evaluation[] = [];

  constructor(private evaluationService: EvaluationService) { }

  ngOnInit(): void {
    this.loadEvaluations();
    this.createChart();
    
  }

  loadEvaluations(): void {
    this.evaluationService.getAllEvaluations().subscribe(
      (data: Evaluation[]) => {
        this.evaluations = data;
        console.log('Evaluations:', this.evaluations);
      },
      error => {
        console.error('Error loading evaluations', error);
      }
    );
  }
 // Rating
 updateRating(id: number, newRating: number) {
  this.evaluationService.updateRating(id, newRating)
      .subscribe(response => {
          // Handle successful update if needed
          console.log('Rating updated successfully:', response);
          // You might want to refresh the evaluations list or update the specific evaluation
          this.loadEvaluations();
      }, error => {
          // Handle error if needed
          console.error('Error updating rating:', error);
      });
}

chart:any;
createChart() {
  const states = [ 'en attente','ACCEPTED', 'REFUSED'];

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
            label: "Etat De l'Evaluation",
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
  
}