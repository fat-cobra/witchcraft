import { Player } from './player.model';
export class CardArgs {
    public name: string;
    public description: string;
    public image: string;
}

export abstract class Card {
    constructor(public cardData: CardArgs) { }
}

export class ResolveArgs {
    caster: Player;
    foes: Player[];

    selectFoe(): Player {
        return null; // Not yet implemented
    }
}