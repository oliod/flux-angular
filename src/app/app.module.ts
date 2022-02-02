import { NgModule, CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonModule, JsonPipe, HashLocationStrategy, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr, 'fr-FR');

import { OverlayContainer } from '@angular/cdk/overlay';

import {
  FlexLayoutModule,
  StyleUtils,
  StylesheetMap,
  LayoutStyleBuilder,
  MediaMarshaller,
  LayoutAlignStyleBuilder,
  FlexStyleBuilder } from '@angular/flex-layout';
import { ɵMatchMedia, BreakPointRegistry, PrintHook } from '@angular/flex-layout/core';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { PrettyJsonModule } from 'angular2-prettyjson';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NavService } from './shared/services/nav.service';
import { SpeedDialFabComponent } from './shared/speed-dial-fab/speed-dial-fab.component';
import { RequestService } from './shared/services/request.service';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';
import { SlideToggleErrorComponent } from './shared/components/slide-toggle-error.component';
import { TitleAndDescriptionComponent } from './shared/components/title-and-description.component';
import { ProgressBarComponent } from './shared/components/progress-bar.component';
import { ButtonsTestClearComponent } from './shared/components/buttons-test-clear.component';
import { InputRnComponent } from './shared/components/input-rn.component';
import { MultiDatepickerModule } from './shared/multidatepicker/multidatepicker.module';
import { SnackBarComponent } from './shared/components/snack-bar.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { NavListComponent } from './nav-list/nav-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { HelpComponent } from './flux/help/help.component';
import { ActivationPaidSumsComponent } from './flux/unemployment-data-v3/activation-paid-sums/activation-paid-sums.component';
import { ExemptionHistoryComponent } from './flux/unemployment-data-v3/exemption-history/exemption-history.component';
import { NoEarningCapacityComponent } from './flux/unemployment-data-v3/no-earning-capacity/no-earning-capacity.component';
import { PaidSumsComponent } from './flux/unemployment-data-v3/paid-sums/paid-sums.component';
import { PaymentsComponent } from './flux/unemployment-data-v3/payments/payments.component';
import { RightsComponent } from './flux/unemployment-data-v3/rights/rights.component';
import { SanctionHistoryComponent } from './flux/unemployment-data-v3/sanction-history/sanction-history.component';
import { ScaleCodeHistoryComponent } from './flux/unemployment-data-v3/scale-code-history/scale-code-history.component';
import { ScheduledPaymentComponent } from './flux/unemployment-data-v3/scheduled-payment/scheduled-payment.component';
import { WorkDisabilityComponent } from './flux/unemployment-data-v3/work-disability/work-disability.component';
import { YoungAvailabilityComponent } from './flux/unemployment-data-v3/young-availability/young-availability.component';
import { CarriereComponent } from './flux/self-employed-v2/carriere/carriere.component';
import { ContributionsComponent } from './flux/self-employed-v2/contributions/contributions.component';
import { MediprimaV1Component } from './flux/mediprima-v1/mediprima-v1.component';
import { MediprimaV2Component } from './flux/mediprima-v2/mediprima-v2.component';
import { PrimeInstallationComponent } from './flux/list-of-attestation/prime-installation/prime-installation.component';
import { A036Component } from './flux/list-of-attestation/a036/a036.component';
import { ExonerationsComponent } from './flux/list-of-attestation/exonerations/exonerations.component';
import { ExonerationsArt35Component } from './flux/list-of-attestation/exonerations-art35/exonerations-art35.component';
import { FormulairesComponent } from './flux/list-of-attestation/formulaires/formulaires.component';
import { PiisComponent } from './flux/list-of-attestation/piis/piis.component';
import { Statut65Component } from './flux/list-of-attestation/statut65/statut65.component';
import { LWComponent } from './flux/living-wages/lw/lw.component';
import { LWPeriodsComponent } from './flux/living-wages/lw-periods/lw-periods.component';
import { LWPeriodsFlandersComponent } from './flux/living-wages/lw-periods-flanders/lw-periods-flanders.component';
import { LWPeriodsPerPCSAComponent } from './flux/living-wages/lw-periods-per-pcsa/lw-periods-per-pcsa.component';
import { LWPeriodsPerPCSAFlandersComponent } from './flux/living-wages/lw-periods-per-pcsa-flanders/lw-periods-per-pcsa-flanders.component';
import { FindDivisionByEntNumberComponent } from './flux/patrimony-service/division-by-ent-number/division-by-ent-number.component';
import { EntImmovablePropertiesComponent } from './flux/patrimony-service/ent-immovable-properties/ent-immovable-properties.component';
import { ImmovablePropertiesComponent } from './flux/patrimony-service/immovable-properties/immovable-properties.component';
import { ConsultUrgentMedicalAidAttestationComponent } from './flux/mediprima-v2/c-urgent-medical/c-urgent-medical.component';
import { ConsultCarmedAtAgreementDateComponent } from './flux/mediprima-v2/cc-at-agreement-date/cc-at-agreement-date.component';
import { ConsultCarmedByVersionComponent } from './flux/mediprima-v2/cc-by-version/cc-by-version.component';
import { ConsultCarmedCoverageComponent } from './flux/mediprima-v2/cc-coverage/cc-coverage.component';
import { ConsultCarmedInterventionComponent } from './flux/mediprima-v2/cc-intervention/cc-intervention.component';
import { CloseCarmedComponent } from './flux/mediprima-v2/close-carmed/close-carmed.component';
import { ConsultCarmedComponent } from './flux/mediprima-v2/consult-carmed/consult-carmed.component';
import { EvaluateCarmedComponent } from './flux/mediprima-v2/evaluate-carmed/evaluate-carmed.component';
import { EvaluateModifiedCarmedComponent } from './flux/mediprima-v2/evaluate-modified-carmed/evaluate-modified-carmed.component';
import { ModifyCarmedComponent } from './flux/mediprima-v2/modify-carmed/modify-carmed.component';
import { OpenCarmedComponent } from './flux/mediprima-v2/open-carmed/open-carmed.component';
import { QueryCarmedManagerComponent } from './flux/mediprima-v2/query-carmed-manager/query-carmed-manager.component';
import { StopCarmedComponent } from './flux/mediprima-v2/stop-carmed/stop-carmed.component';
import { AlertReactionComponent } from './flux/alert-reaction/alert-reaction.component';
import { CadnetComponent } from './flux/cadnet/cadnet.component';
import { ChildBenefitsComponent } from './flux/child-benefits/child-benefits.component';
import { DimonaComponent } from './flux/dimona/dimona.component';
import { DolsisComponent } from './flux/dolsis/dolsis.component';
import { FamilyAllowancesServiceComponent } from './flux/family-allowances-service/family-allowances-service.component';
import { HandiFluxComponent } from './flux/handi-flux/handi-flux.component';
import { HealthCareInsuranceComponent } from './flux/health-care-insurance/health-care-insurance.component';
import { IdentifyPersonComponent } from './flux/identify-person/identify-person.component';
import { ListOfAttestationComponent } from './flux/list-of-attestation/list-of-attestation.component';
import { LivingWagesComponent } from './flux/living-wages/living-wages.component';
import { ManageAccessComponent } from './flux/manage-access/manage-access.component';
import { PatrimonyServiceComponent } from './flux/patrimony-service/patrimony-service.component';
import { PensionRegisterComponent } from './flux/pension-register/pension-register.component';
import { RetrieveTiGroupsV1Component } from './flux/retrieve-ti-groups-v1/retrieve-ti-groups-v1.component';
import { RetrieveTiGroupsV2Component } from './flux/retrieve-ti-groups-v2/retrieve-ti-groups-v2.component';
import { SelfEmployedV1Component } from './flux/self-employed-v1/self-employed-v1.component';
import { SelfEmployedV2Component } from './flux/self-employed-v2/self-employed-v2.component';
import { SocialRateInvestigationComponent } from './flux/social-rate-investigation/social-rate-investigation.component';
import { TaxAssessmentDataV1Component } from './flux/tax-assessment-data-v1/tax-assessment-data-v1.component';
import { TaxAssessmentDataV2Component } from './flux/tax-assessment-data-v2/tax-assessment-data-v2.component';
import { UnemploymentDataV1Component } from './flux/unemployment-data-v1/unemployment-data-v1.component';
import { UnemploymentDataV2Component } from './flux/unemployment-data-v2/unemployment-data-v2.component';
import { UnemploymentDataV3Component } from './flux/unemployment-data-v3/unemployment-data-v3.component';


@NgModule({
  imports: [
    MaterialModule,
    RouterModule,
    MultiDatepickerModule,
    PrettyJsonModule,
    NgxJsonViewerModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  entryComponents: [
    ConfirmDialogComponent,
    SnackBarComponent
  ],
  declarations: [
    AppComponent,

    ConfirmDialogComponent,
    SnackBarComponent,
    SpeedDialFabComponent,

    NavListComponent,
    NavTopComponent,

    SlideToggleErrorComponent,
    TitleAndDescriptionComponent,
    InputRnComponent,
    ProgressBarComponent,
    ButtonsTestClearComponent,
    NotFoundComponent,
    HelpComponent,

    AlertReactionComponent,
    CadnetComponent,
    ChildBenefitsComponent,
    DimonaComponent,
    UnemploymentDataV1Component,
    UnemploymentDataV2Component,
    UnemploymentDataV3Component,
    DolsisComponent,
    FamilyAllowancesServiceComponent,
    HandiFluxComponent,
    HealthCareInsuranceComponent,
    IdentifyPersonComponent,
    ListOfAttestationComponent,
    LivingWagesComponent,
    ManageAccessComponent,
    PatrimonyServiceComponent,
    PensionRegisterComponent,
    RetrieveTiGroupsV1Component,
    RetrieveTiGroupsV2Component,
    SelfEmployedV1Component,
    SelfEmployedV2Component,
    SocialRateInvestigationComponent,
    TaxAssessmentDataV1Component,
    TaxAssessmentDataV2Component,

    ActivationPaidSumsComponent,
    ExemptionHistoryComponent,
    NoEarningCapacityComponent,
    PaidSumsComponent,
    PaymentsComponent,
    RightsComponent,
    SanctionHistoryComponent,
    ScaleCodeHistoryComponent,
    ScheduledPaymentComponent,
    WorkDisabilityComponent,
    YoungAvailabilityComponent,

    CarriereComponent,
    ContributionsComponent,

    MediprimaV1Component,
    MediprimaV2Component,

    A036Component,
    ExonerationsComponent,
    ExonerationsArt35Component,
    FormulairesComponent,
    PiisComponent,
    PrimeInstallationComponent,
    Statut65Component,

    LWComponent,
    LWPeriodsComponent,
    LWPeriodsFlandersComponent,
    LWPeriodsPerPCSAComponent,
    LWPeriodsPerPCSAFlandersComponent,

    FindDivisionByEntNumberComponent,
    EntImmovablePropertiesComponent,
    ImmovablePropertiesComponent,

    ConsultUrgentMedicalAidAttestationComponent,
    ConsultCarmedAtAgreementDateComponent,
    ConsultCarmedByVersionComponent,
    ConsultCarmedCoverageComponent,
    ConsultCarmedInterventionComponent,
    CloseCarmedComponent,
    ConsultCarmedComponent,
    EvaluateCarmedComponent,
    EvaluateModifiedCarmedComponent,
    ModifyCarmedComponent,
    OpenCarmedComponent,
    QueryCarmedManagerComponent,
    StopCarmedComponent

  ],
  bootstrap: [AppComponent],
  providers:  [
    PrintHook,
    StyleUtils,
    StylesheetMap,
    LayoutAlignStyleBuilder,
    LayoutStyleBuilder,
    FlexStyleBuilder,
    MediaMarshaller,
    ɵMatchMedia,
    BreakPointRegistry,
    OverlayContainer,
    NavService,
    RequestService,
    [
      { provide: JsonPipe, useClass: HashLocationStrategy }
    ]
  ]
})
export class AppModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.getContainerElement().classList.add('bcss-dark-theme');
  }
}
