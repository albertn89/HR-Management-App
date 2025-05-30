import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { housingReducer } from 'src/app/store/housing/housing.reducer';
import { HousingEffects } from 'src/app/store/housing/housing.effects';
import { HousingManagementRoutingModule } from './housing-management-routing.module';
import { HousingManagementComponent } from './housing-management.component';
import { AddHouseDialogComponent } from './components/add-house-dialog/add-house-dialog.component';

@NgModule({
  declarations: [
    HousingManagementComponent,
    AddHouseDialogComponent
  ],
  imports: [
    CommonModule,
    HousingManagementRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTooltipModule,
    MatSnackBarModule,
    StoreModule.forFeature('housing', housingReducer),
    EffectsModule.forFeature([HousingEffects])
  ]
})
export class HousingManagementModule { }