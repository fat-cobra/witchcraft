import { NothingHappensDeadWizardCard, RevengeDeadWizardCard, HandicapDeadWizardCard } from './dead-wizard-cards';
import { Card } from './card.model';
import { SpellCard } from './spell-card.model';
import { TreasureCard } from './treasure-card.model';
import { DeadWizardCard } from './dead-wizard-card.model';
import { AbraSourceSpell, KadabraDeliverySpell } from './spells';

export class Decks {
    public SpellsDeck: SpellsDeck = new SpellsDeck();
    public TreasureDeck: TreasureDeck = new TreasureDeck();
    public DeadWizardDeck: DeadWizardDeck = new DeadWizardDeck();
}

abstract class Deck {
    protected cards: Array<Card>;
    protected discarded: Array<Card>;

    public draw(): Card {
        return this.cards.pop();
    }

    public reset()  {
        this.discarded.forEach(card => {
            this.cards.push(card);
        });

        this.discarded = new Array<Card>();

        this.shuffle();
    }

    public discard(card: Card) {
        this.discarded.push(card);
    }

    public shuffle() {
        for (let i: number = 0; i < this.cards.length; i++)
        {
            let c: Card;
            let r: number = Math.floor(Math.random() * (this.cards.length - i)) + i - 1;

            /* Shuffle */
            c = this.cards[r];
            this.cards[r] = this.cards[i];
            this.cards[i] = c;
        }
    }
    
    public putCard(card: Card) {
        this.cards.push(card);
    }

    protected initializeDeck(cardType: string) {
        let obj: any;
        for (obj in window) {
            if (obj.endsWith(cardType)) {
                /* This is a bit dangerous, security-wise */
                this.cards.push(window[obj]());
            }
        }
    }
}

class SpellsDeck extends Deck {
    public constructor() {
        super();
        this.cards = new Array<SpellCard>();
        this.initializeDeck("SpellCard");
    }
}

class TreasureDeck extends Deck {
    public constructor() {
        super();
        this.cards = new Array<TreasureCard>();
        this.initializeDeck("TreasureCard");
    }
}

class DeadWizardDeck extends Deck {
    public constructor() {
        super();
        this.cards = new Array<DeadWizardCard>();
        this.initializeDeck("DeadWizartCard");
    }
}