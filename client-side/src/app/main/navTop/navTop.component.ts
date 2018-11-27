import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-navtop',
    templateUrl: './navTop.component.html',
    styleUrls: ['../main.component.css']
})

export class navTopComponent{

    constructor( private router: Router ) {}

    loginTabClick($event) {
        console.log($event.index)
        switch ($event.index) {
            case 0:
                this.router.navigate(['login'])
                break;
            case 1:
                this.router.navigate(['register'])
                break;
            case 2:
                this.router.navigate(['forgotpassword'])
                break;
        }
    }
}