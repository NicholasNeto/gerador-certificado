import { Component, ViewChild } from '@angular/core';
import { SecondaryButton } from "../../_components/secondary-button/secondary-button";
import { PrimaryButton } from "../../_components/primary-button/primary-button";
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificado } from '../../interfaces/certificado';
import { format } from 'date-fns';
import { CertificadoService } from '../../services/certificado.services';
import { v4 as uuidv4 } from "uuid"
import { Router } from '@angular/router';



@Component({
  selector: 'app-certificado-form',
  imports: [SecondaryButton, PrimaryButton, FormsModule, CommonModule],
  templateUrl: './certificado-form.html',
  styleUrl: './certificado-form.css'
})
export class CertificadoForm {
  atividade: string = ""

  @ViewChild('form') form!: NgForm


  certificado: Certificado = {
    atividades: [],
    name: "",
    dateEmissao: "",
    id: ""
  }

  constructor(private certificadoService: CertificadoService, private router: Router) { }


  campoInvalido(controle: NgModel) {
    return controle.invalid && controle.touched
  }

  formValido() {
    return this.certificado.atividades.length > 0 && this.certificado.name.length > 0;
  }


  adicionaratividade() {
    if (this.atividade.length > 0) {
      this.certificado.atividades.push(this.atividade)
      this.atividade = ""
    }

  }


  removeAtividade(index: number) {
    this.certificado.atividades.splice(index, 1)
  }

  submit() {

    if (!this.formValido()) {
      return
    }

    this.certificado.dateEmissao = this.dataAtual()
    this.certificado.id = uuidv4()
    this.certificadoService.adicionaCertificado(this.certificado)
    this.router.navigate(['certificado', this.certificado.id])

    // this.certificado = this.initialCertificado()
    // this.form.resetForm()

  }

  dataAtual() {
    return format(new Date(), "yyyy-MM-dd")
  }

  initialCertificado() {
    return {
      atividades: [],
      name: "",
      dateEmissao: "",
      id: ""
    }
  }
}
