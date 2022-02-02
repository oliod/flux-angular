import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AlertReactionComponent } from './flux/alert-reaction/alert-reaction.component';
import { CadnetComponent } from './flux/cadnet/cadnet.component';
import { ChildBenefitsComponent } from './flux/child-benefits/child-benefits.component';
import { DimonaComponent } from './flux/dimona/dimona.component';
import { UnemploymentDataV1Component } from './flux/unemployment-data-v1/unemployment-data-v1.component';
import { FamilyAllowancesServiceComponent } from './flux/family-allowances-service/family-allowances-service.component';
import { HandiFluxComponent } from './flux/handi-flux/handi-flux.component';
import { DolsisComponent } from './flux/dolsis/dolsis.component';
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
import { UnemploymentDataV2Component } from './flux/unemployment-data-v2/unemployment-data-v2.component';
import { UnemploymentDataV3Component } from './flux/unemployment-data-v3/unemployment-data-v3.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HelpComponent } from './flux/help/help.component';
import { MediprimaV1Component } from './flux/mediprima-v1/mediprima-v1.component';
import { MediprimaV2Component } from './flux/mediprima-v2/mediprima-v2.component';

const routes: Routes = [
  { path: '', component: AlertReactionComponent, pathMatch: 'full', data: {animation: 'isRight'} },
  { path: 'alert-reaction', component: AlertReactionComponent, data: {animation: 'isLeft'} },
  { path: 'cadnet', component: CadnetComponent, data: {animation: 'isRight'}  },
  { path: 'child-benefits', component: ChildBenefitsComponent, data: {animation: 'isLeft'} },
  { path: 'dimona', component: DimonaComponent, data: {animation: 'isRight'} },
  { path: 'dolsis', component: DolsisComponent, data: {animation: 'isLeft'} },
  { path: 'family-allowances-service', component: FamilyAllowancesServiceComponent, data: {animation: 'isRight'} },
  { path: 'handi-flux', component: HandiFluxComponent, data: {animation: 'isLeft'} },
  { path: 'health-care-insurance', component: HealthCareInsuranceComponent, data: {animation: 'isRight'} },
  { path: 'identify-person', component: IdentifyPersonComponent, data: {animation: 'isLeft'} },
  { path: 'list-of-attestation', component: ListOfAttestationComponent, data: {animation: 'isRight'} },
  { path: 'living-wages', component: LivingWagesComponent, data: {animation: 'isLeft'} },
  { path: 'manage-access', component: ManageAccessComponent, data: {animation: 'isRight'} },
  { path: 'mediprima-v1', component: MediprimaV1Component, data: {animation: 'isLeft'} },
  { path: 'mediprima-v2', component: MediprimaV2Component, data: {animation: 'isRight'} },
  { path: 'patrimony-service', component: PatrimonyServiceComponent, data: {animation: 'isLeft'} },
  { path: 'pension-register', component: PensionRegisterComponent, data: {animation: 'isRight'} },
  { path: 'retrieve-ti-groups-v1', component: RetrieveTiGroupsV1Component, data: {animation: 'isLeft'} },
  { path: 'retrieve-ti-groups-v2', component: RetrieveTiGroupsV2Component, data: {animation: 'isRight'} },
  { path: 'self-employed-v1', component: SelfEmployedV1Component, data: {animation: 'isLeft'}  },
  { path: 'self-employed-v2', component: SelfEmployedV2Component, data: {animation: 'isRight'}  },
  { path: 'social-rate-investigation', component: SocialRateInvestigationComponent, data: {animation: 'isLeft'} },
  { path: 'tax-assessment-data-v1', component: TaxAssessmentDataV1Component, data: {animation: 'isRight'} },
  { path: 'tax-assessment-data-v2', component: TaxAssessmentDataV2Component, data: {animation: 'isLeft'} },
  { path: 'unemployment-data-v1', component: UnemploymentDataV1Component, data: {animation: 'isRight'} },
  { path: 'unemployment-data-v2', component: UnemploymentDataV2Component, data: {animation: 'isLeft'} },
  { path: 'unemployment-data-v3', component: UnemploymentDataV3Component, data: {animation: 'isRight'} },
  { path: 'help', component: HelpComponent, data: {animation: 'isLeft'} },
  { path: '**', component: NotFoundComponent, data: {animation: 'isRight'} }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
