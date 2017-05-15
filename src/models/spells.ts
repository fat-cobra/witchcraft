import { ResolveArgs } from './card.model';
import { SpellCard, SpellType, Glyph } from './spell-card.model';

export class AbraSourceSpell extends SpellCard {
    constructor() {
        super({
            name: "Abra",
            description: "Each foe loses 1 HP",
            image: "",
            type: SpellType.Source,
            glyph: Glyph.Dark
        });
    }

    resolve(args: ResolveArgs): void {
        for (let foe of args.foes) {
            foe.hitPoints -= 1;
        }
    }
}

export class KadabraDeliverySpell extends SpellCard {
    constructor() {
        super({
            name: "Kadabra",
            description: "A foe of your choice loses HP equals to a quarter of your HP",
            image: "",
            type: SpellType.Delivery,
            glyph: Glyph.Dark
        });
    }

    resolve(args: ResolveArgs): void {
        args.selectFoe().hitPoints -= args.caster.hitPoints / 4;
    }
}