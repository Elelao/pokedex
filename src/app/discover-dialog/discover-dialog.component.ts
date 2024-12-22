import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog, DialogModule } from '@angular/cdk/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { SpeciesService } from '@core/services/species.service';

@Component({
  selector: 'app-discover-dialog',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './discover-dialog.component.html',
  styleUrl: './discover-dialog.component.scss'
})
export class DiscoverDialogComponent {
  selectedFile: File | null = null;
  isUploading = false;

  constructor(
    public dialogRef: MatDialogRef<DiscoverDialogComponent>,
    private speciesService: SpeciesService
  ) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.selectedFile) return;

    this.isUploading = true;
    this.speciesService.identifySpecies(this.selectedFile).subscribe({
      next: (response:any) => {
        this.isUploading = false;
        this.dialogRef.close(response);
      },
      error: (error:any) => {
        console.error('Error identifying species:', error);
        this.isUploading = false;
      }
    });
  }
}