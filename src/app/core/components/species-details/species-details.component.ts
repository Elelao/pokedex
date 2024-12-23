import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpeciesService, Species } from '../../../core/services/species.service';
import { unwrapData } from '@core/http/unwrap-data';

@Component({
  selector: 'app-species-details',
  templateUrl: './species-details.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SpeciesDetailsComponent implements OnInit {
  species?: Species;
  isLoading: boolean = true;
  error: string | null = null;
  private speciesService: SpeciesService;
  private route: ActivatedRoute;

  constructor(
    speciesService: SpeciesService,
    route: ActivatedRoute
  ) {
    this.speciesService = speciesService;
    this.route = route;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.speciesService.getSpeciesById(id).subscribe({
        next: (data: Species) => {
          data = unwrapData(data)
          this.species = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching species:', error);
          this.error = 'Failed to load species details';
          this.isLoading = false;
        }
      });
    }
  }
}