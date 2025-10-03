import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SecondaryButton } from "../../_components/secondary-button/secondary-button";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { format } from "date-fns";
import { CertificadoService } from '../../services/certificado.services';
import { Certificado } from '../../interfaces/certificado';
import html2canvas from "html2canvas"



@Component({
  selector: 'app-certificado',
  imports: [SecondaryButton, RouterLink],
  templateUrl: './certificado.html',
  styleUrl: './certificado.css'
})
export class CertificadoComponent implements OnInit {

  constructor(private certificadoService: CertificadoService, private route: ActivatedRoute){}
  id: string | null = null
  certificado: Certificado | undefined

  @ViewChild('certificadoContainer') certificadoElement!: ElementRef

  dateFormatter(){
    const dateEmissao = this.certificado?.dateEmissao || new Date()
    return format(dateEmissao, "dd-MM-yyyyy")
  }

  downloadCertificado(){
    if(this.certificado){
      html2canvas(this.certificadoElement.nativeElement, {scale: 2}).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png')
        link.download = `certificado-${this.certificado?.name.replaceAll(" ", "-")}.png`
        link.click()
      })
    }

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.certificado = this.certificadoService.certificados.find(it => it.id === this.id)
    })
  }

}
