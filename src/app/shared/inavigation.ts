import { ICON_LEGAL_CONTEXT, ICON_FLUX, ICON_MORE, ICON_ENV, ICON_HELP } from '../shared/app-settings';

export interface INavigationParams {
  env?: string;
  context?: string;
  route?: string;
  position?: string;
  description?: string;
}

export interface INavigation {
  displayName: string;
  shortName?: string;
  disabled?: boolean;
  selected?: boolean;
  iconName: string;
  route?: string;
  position?: number;
  description?: string;
  children?: INavigation[];
}

export class NavigMenu {

  navigList(): INavigation[] {
    return [
      {
        displayName: 'Legal Context', iconName: ICON_LEGAL_CONTEXT, disabled: true, children: [
          { displayName: 'PCSA:SOCIAL_INQUIRY', selected: true, iconName: ICON_MORE, route: ' ', position: 1},
        ]
      },
      {
        displayName: 'Environements', disabled: true, iconName: ICON_ENV, children: [
          { displayName: 'Production (prod)', shortName: 'prod', selected: true, iconName: ICON_MORE,  route: ' ', position: 2 },
          { displayName: 'Acceptation (acpt)', shortName: 'acpt', iconName: ICON_MORE, route: ' ', position: 2 },
          { displayName: 'Test (test)', shortName: 'test',  iconName: ICON_MORE, route: ' ', position: 2 }
        ]
      },
      {
        displayName: 'Flux', iconName: ICON_FLUX,
        children: [
          {
            displayName: 'AlertReaction', iconName: ICON_MORE, route: 'alert-reaction', position: 3,
            description: `- D\'envoyer une motivation clignotant à la BCSS. `,
            selected: true
          },
          {
            displayName: 'Cadnet', iconName: ICON_MORE, route: 'cadnet', position: 3,
            description: `- Données cadastrales de la personne.`
          },
          {
            displayName: 'ChildBenefits', iconName: ICON_MORE, route: 'child-benefits', position: 3,
            description: `- Child Benefits - Consultation sur les allocations familiales `
          },
          {
            displayName: 'Dimona', iconName: ICON_MORE, route: 'dimona', position: 3,
            description: `- Inactive.`
          },
          {
            displayName: 'Dolsis', iconName: ICON_MORE, route: 'dolsis', position: 3,
            description: `- Accès direct aux données de l'ONSS.`
          },
          {
            displayName: 'FamilyAllowancesService', iconName: ICON_MORE, route: 'family-allowances-service', position: 3,
            description: `- Consultation sur les allocations familiales. ( This web service is not authorized to use! ).`
          },
          {
            displayName: 'HandiFlux', iconName: ICON_MORE, route: 'handi-flux', position: 3,
            description: `- Données de la DGPH (Direction Générale de la Personnes Handicapées).`
          },
          {
            displayName: 'HealthCareInsurance', iconName: ICON_MORE, route: 'health-care-insurance', position: 3,
            description: `- Données sur l'assurabilité de la personne auprès des mutuelles.`
          },
          {
            displayName: 'IdentifyPerson', iconName: ICON_MORE, route: 'identify-person', position: 3,
            description: `- Identification simplifiée de la personne.`
          },
          {
            displayName: 'ListOfAttestation', iconName: ICON_MORE, route: 'list-of-attestation', position: 3,
            description: `- Listing des attestations de la personne.`
          },
          {
            displayName: 'LivingWages', iconName: ICON_MORE, route: 'living-wages', position: 3,
            description: `- Consultation qui permet de regrouper les attestations multifonctionnelles
                          par période ininterrompue, par CPAS et par type d'aide financière.`
          },
          {
            displayName: 'ManageAccess', iconName: ICON_MORE, route: 'manage-access', position: 3,
            description: `- Gestion des intégrations/désintégrations de la personne.`
          },
          {
          displayName: 'Mediprima', iconName: ICON_MORE,
            children: [
              {
                displayName: 'V1', iconName: ICON_MORE, route: 'mediprima-v1', position: 3,
                description: `- Inactive.`
              },
              {
                displayName: 'V2', iconName: ICON_MORE, route: 'mediprima-v2', position: 3,
                description: `- L'objectif du service pour les prestataires de soins est d'obtenir les informations
                              de prise en charge et, le cas échéant, le numéro d'agrément pour garantir
                              le remboursement.`
              }
            ]
          },
          {
            displayName: 'PatrimonyService', iconName: ICON_MORE, route: 'patrimony-service', position: 3,
            description: `- Consultation les données du patrimoine d'une personne ou entreprise`
          },
          {
            displayName: 'PensionRegister', iconName: ICON_MORE, route: 'pension-register', position: 3,
            description: `- Ouverture du cadastre des pensions.`
          },
          {
            displayName: 'RetrieveTiGroups', iconName: ICON_MORE,
            children: [
              {
                displayName: 'V1', iconName: ICON_MORE, route: 'retrieve-ti-groups-v1', position: 3,
                description: `- Inactive.`
              },
              {
                displayName: 'V2', iconName: ICON_MORE, route: 'retrieve-ti-groups-v2', position: 3,
                description: `- Informations diverses sur la personne.`
              }
            ]
          },
          {
            displayName: 'SelfEmployed', iconName: ICON_MORE,
            children: [
              {
                displayName: 'V1', iconName: ICON_MORE, route: 'self-employed-v1', position: 3,
                description: `- Inactive.`
              },
              {
                displayName: 'V2', iconName: ICON_MORE, route: 'self-employed-v2', position: 3,
                description: `- Données des indépendants`
              }
            ]
          },
          {
            displayName: 'SocialRateInvestigation', iconName: ICON_MORE, route: 'social-rate-investigation', position: 3,
            description: `- Tarif social auprès des fournisseurs d'électricité et de gaz.`
          },
          {
            displayName: 'TaxAssessmentData', iconName: ICON_MORE,
            children: [
              {
                displayName: 'V1', iconName: ICON_MORE, route: 'tax-assessment-data-v1', position: 3,
                description: `- Inactive.`
              },
              {
                displayName: 'V2', iconName: ICON_MORE, route: 'tax-assessment-data-v2', position: 3,
                description: `- Avertissement extrait de rôle.`
              },
            ]
          },
          {
            displayName: 'UnemploymentData', iconName: ICON_MORE,
            children: [
              {
                displayName: 'V1', iconName: ICON_MORE, route: 'unemployment-data-v1', position: 3,
                description: `- Inactive.`
              },
              {
                displayName: 'V2', iconName: ICON_MORE, route: 'unemployment-data-v2', position: 3,
                description: `- Inactive.`
              },
              {
                displayName: 'V3', iconName: ICON_MORE, route: 'unemployment-data-v3', position: 3,
                description: `- Consultation auprès de l’ONEM des données relatives au revenu de remplacement provenant du chômage.`
              }
            ]
          },
        ]
      },
      {
        displayName: 'Help', iconName: ICON_HELP,
        children: [
          { displayName: 'Console BCSS', iconName: ICON_MORE, route: 'help',  position: 3 },
        ]
      }
    ];
  }

}


