import { NothingHappensDeadWizardCard, RevengeDeadWizardCard, HandicapDeadWizardCard } from './dead-wizard-cards';
import { Card } from './card.model';
import { SpellCard } from './spell-card.model';
import { TreasureCard } from './treasure-card.model';
import { DeadWizardCard } from './dead-wizard-card.model';
import { AbraSourceSpell, KadabraDeliverySpell } from './spells';

export class Deck {
    protected cards: Card[];
    public static standard: Deck = new Deck(
        "Standard Deck", 
        "Standard deck with basic cards, good for beginners", 

        new AbraSourceSpell(),
        new KadabraDeliverySpell(),   

        new NothingHappensDeadWizardCard(),
        new RevengeDeadWizardCard(),
        new HandicapDeadWizardCard(),
    );

    constructor(public name: string, public description: string, ...cards: Card[]) {
        this.cards = cards;
    }

    public DrawSpell(): SpellCard {
        return null; // Not implemented
    }

    public DrawTreasure(): TreasureCard {
        return null; // Not implemented
    }

    public DrawDeadWizard(): DeadWizardCard {
        return null; // Not implemented
    }
}