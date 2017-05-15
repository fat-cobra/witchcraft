import { Card, CardArgs } from './card.model';

export abstract class TreasureCardArgs extends CardArgs {

}

export abstract class TreasureCard extends Card {
    constructor(public treasureCardData: TreasureCardArgs) {
        super(treasureCardData);
    }
}