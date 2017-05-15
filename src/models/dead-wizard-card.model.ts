import { CardArgs, Card, ResolveArgs } from './card.model';

export abstract class DeadWizardCardArgs extends CardArgs {
}

export abstract class DeadWizardCard extends Card {
    constructor(public deadWizardCardData: DeadWizardCardArgs) {
        super(deadWizardCardData);
    }
    
    abstract resolve(args: ResolveArgs): void;
}