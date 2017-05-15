import { ResolveArgs } from './card.model';
import { DeadWizardCard } from './dead-wizard-card.model';

export class NothingHappensDeadWizardCard extends DeadWizardCard {
    constructor() {
        super({
            name: "You're dead",
            description: "You're dead, deal with it",
            image: "",
        });
    }

    resolve(args: ResolveArgs): void {
    }
}

export class RevengeDeadWizardCard extends DeadWizardCard {
    constructor() {
        super({
            name: "Revenge",
            description: "A foe of your choice will begin the next game with -5 HP",
            image: "",
        });
    }

    resolve(args: ResolveArgs): void {
        args.selectFoe().hitPoints -= 5;
    }
}

export class HandicapDeadWizardCard extends DeadWizardCard {
    constructor() {
        super({
            name: "Handicap",
            description: "Begin your next game with 2 extra HP",
            image: "",
        });
    }

    resolve(args: ResolveArgs): void {
        args.caster.hitPoints += 2;
    }
}