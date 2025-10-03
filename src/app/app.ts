import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./_components/navbar/navbar"
import { BaseUi } from './_components/base-ui/base-ui';
import { CertificadoService } from './services/certificado.services';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BaseUi],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('gerador-certificado');
  exibeNavbar: boolean = false

  constructor(private certificadoService: CertificadoService) { }


  ngOnInit(): void {
    const certificadosData = localStorage.getItem("certificados");
    this.certificadoService.certificados = certificadosData ? JSON.parse(certificadosData) : []
  }
}
