import { Component, Input } from '@angular/core';

@Component({
    selector: 'nice-button',
    templateUrl: 'nice-button.html'
})
export class NiceButtonComponent {

    @Input() private message: string;

    constructor() {

    }

    private sayHello() {
        alert(this.message);
    }

}
