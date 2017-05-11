import { HomePage } from './../home/home';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    constructor(private afAuth: AngularFireAuth, nav: NavController) {
        this.afAuth.authState.subscribe(state => {
            console.log(state);
            
            if (state) {
                nav.push(HomePage);
            }
        });
    }

    private facebookLogin() {
        this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
}
