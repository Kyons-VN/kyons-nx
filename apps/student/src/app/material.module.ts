import { ClipboardModule } from '@angular/cdk/clipboard';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

@NgModule({
  declarations: [],
  exports: [
    // A11yModule,
    // CdkAccordionModule,
    ClipboardModule,
    // CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    // DragDropModule,
    // MatAutocompleteModule,
    // MatBadgeModule,
    // MatBottomSheetModule,
    // MatButtonModule,
    // MatButtonToggleModule,
    // MatCardModule,
    // MatCheckboxModule,
    // MatChipsModule,
    // MatStepperModule,
    // MatDatepickerModule,
    // MatDialogModule,
    MatDividerModule,
    // MatExpansionModule,
    // MatGridListModule,
    MatIconModule,
    // MatInputModule,
    // MatListModule,
    MatMenuModule,
    // MatNativeDateModule,
    MatPaginatorModule,
    // MatProgressBarModule,
    // MatProgressSpinnerModule,
    // MatRadioModule,
    // MatRippleModule,
    // MatSelectModule,
    // MatSidenavModule,
    // MatSliderModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    // MatToolbarModule,
    MatTooltipModule,
    // MatTreeModule,
    // OverlayModule,
    // PortalModule,
    // ScrollingModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
  ],
})
export class MaterialModule { }
