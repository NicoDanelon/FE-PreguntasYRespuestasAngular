import { RespuestaCuestionarioService } from './../../../services/respuesta-cuestionario.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService: LoginService,
              private router: Router,
              private respuestaCuestionarioService: RespuestaCuestionarioService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.loginService.removeLocalStorage();
    this.respuestaCuestionarioService.removeLocalStorage();
    this.router.navigate(['/inicio']);
  }

}
