import { NothingHappensDeadWizardCard, RevengeDeadWizardCard, HandicapDeadWizardCard } from './dead-wizard-cards';
import { Card } from './card.model';
import { SpellCard } from './spell-card.model';
import { TreasureCard } from './treasure-card.model';
import { DeadWizardCard } from './dead-wizard-card.model';
import { AbraSourceSpell, KadabraDeliverySpell } from './spells';

export abstract class Deck {
    protected cards: Array<Card>;
    protected static deck: Deck;

    public drawCard(): Card
    {
        return this.cards.pop();
    }

    public shuffle()
    {
        for (let i: number = 0; i < this.cards.length; i++)
        {
            let c: Card;
            let r: number = Math.floor(Math.random() * (this.cards.length - i)) + i;

            /* Shuffle */
            c = this.cards[r];
            this.cards[r] = this.cards[i];
            this.cards[i] = c;
        }
        
    }
    
    public putCard(card: Card) {
        this.cards.push(card);
    }
}

export class SpellsDeck extends Deck {
    public static deck: SpellsDeck = new SpellsDeck();

    private constructor() {
        super();
        this.cards = new Array<SpellCard>();
        this.cards.push(new AbraSourceSpell());
    }
}

export class TreasureDeck extends Deck {
    public static deck: TreasureDeck = new TreasureDeck();

    private constructor() {
        super();
        this.cards = new Array<TreasureCard>();
    }
}

export class DeadWizardDeck extends Deck {
    public static deck: DeadWizardDeck = new DeadWizardDeck();

    private constructor() {
        super();
        this.cards = new Array<DeadWizardCard>();
    }
}

export class DiscardDeck extends Deck {
    public static deck: DiscardDeck = new DiscardDeck();

    private constructor() {
        super();
        this.cards = new Array<SpellCard>();
    }

    public discard(card: Card) {
        this.cards.push(card);
    }

    public returnCards() {
        let workArr: Array<Card> = this.cards.copyWithin(-1, -1);

        workArr.forEach(card => {
            if (card instanceof SpellCard)
            {
                SpellsDeck.deck.putCard(card);
            }
            else if (card instanceof TreasureCard)
            {
                TreasureDeck.deck.putCard(card);
            }
            else if (card instanceof DeadWizardCard)
            {
                DeadWizardDeck.deck.putCard(card);
            }
        });
    }
}