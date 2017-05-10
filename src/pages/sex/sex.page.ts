import { Component } from '@angular/core';
import { SexService } from '../../services/sex.service';

@Component({
    templateUrl: 'sex.html'
})
export class SexPage {
    private text: string;

    constructor(sexService: SexService) {
        this.text = sexService.moan();
    }
}