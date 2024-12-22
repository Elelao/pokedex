import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesService, Species } from '../../../core/services/species.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-species-list',
  templateUrl: './species-list.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class SpeciesListComponent implements OnInit, OnDestroy {
  isLoading = false;
  species: Species[] = [];
  error: string | null = null;

  private sub1!: Subscription;
  constructor(private speciesService: SpeciesService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSpecies();
  }

  ngOnDestroy() {
    if(this.sub1!=null)
      this.sub1.unsubscribe();
    
  }

  private loadSpecies() {
    this.isLoading = true;
    this.sub1=this.speciesService.getAllSpecies()
      .subscribe({
        next: (data) => {
          this.species = data.data;
          console.log(data, this.species.length);
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching species:', error);
          this.error = 'Failed to load species. Please try again later.';
          this.isLoading = false;
        }
      });
  }
}