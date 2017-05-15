import { SpellCard } from './spell-card.model';
import { TreasureCard } from './treasure-card.model';
import { DeadWizardCard } from './dead-wizard-card.model';

export class Player {
    hitPoints: number;
    user: any;
    lastStandingWizardTokens: number;
    hand: SpellCard[];
    treasures: TreasureCard[];
    deadWizardCards: DeadWizardCard[];
}