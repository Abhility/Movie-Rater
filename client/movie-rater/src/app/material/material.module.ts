import { NgModule } from '@angular/core';
import {
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatRadioModule,
  MatTabsModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  MatDividerModule,
  MatMenuModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
} from '@angular/material';

const material = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatRadioModule,
  MatTabsModule,
  MatToolbarModule,
  MatListModule,
  MatIconModule,
  MatExpansionModule,
  MatDividerModule,
  MatMenuModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatProgressBarModule
];
@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
