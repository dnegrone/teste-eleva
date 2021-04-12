import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../../core/storage/storage.service';
import { IEscolaSalvarModel } from '../escola.model';
import { EscolaService } from '../escola.service';

@Component({
  selector: 'app-cadastrar-escola',
  templateUrl: './cadastrar-escola.component.html',
  styleUrls: ['./cadastrar-escola.component.scss']
})
export class CadastrarEscolaComponent implements OnInit {

  cadastrarEscolaForm!: FormGroup;
  enviado = false;
  KEY: string = 'escola';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private escolaService: EscolaService
  ) {}

  ngOnInit(): void {
    this.cadastrarEscolaForm = this.formBuilder.group({
      nomeEscola: ['', Validators.required],
      nomeResponsavelEscola: ['', Validators.required],
      telefone: ['', Validators.required],
      cnpj: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.cadastrarEscolaForm.controls; }
  get formValues() { return this.cadastrarEscolaForm.value as IEscolaSalvarModel;}

  onSubmit() {
    this.enviado = true;

    // Formulário inválido não será enviado
    if(this.cadastrarEscolaForm.invalid) {
      return;
    }

    this.escolaService.salvar(this.formValues);
    this.router.navigateByUrl('/escola');
  }

  onReset() {
    this.enviado = false;
    this.cadastrarEscolaForm.reset();
  }

}
