import { CardArgs, Card, ResolveArgs } from './card.model';

export class SpellCardArgs extends CardArgs {
    public type: SpellType;
    public glyph: Glyph;
}

export abstract class SpellCard extends Card {
    constructor(public spellCardData: SpellCardArgs) {
        super(spellCardData);
    }

    abstract resolve(args: ResolveArgs): void;
}

export enum SpellType {
    Source,
    Quality,
    Delivery,
}

export enum Glyph {
    Arcane,
    Dark,
}