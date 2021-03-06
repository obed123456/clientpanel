import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
import { SettingsService } from '../../services/settings.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean; 
  LoggedInUser: string; 
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.authService.getAuth()
    .subscribe(auth => {
      if(auth) {
        this.isLoggedIn = true;
        this.LoggedInUser = auth.email; 

      } else {
        this.isLoggedIn = false;
      }
    });

    this.showRegister = this.settingsService.getSettings().allowRegistration; 
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are logged out now', {
      cssClass: 'alert-success', timeout: 2000
    });
    this.router.navigate(['/login']);
  }

}
