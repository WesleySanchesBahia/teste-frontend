import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-form-user',
  standalone: false,
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent {
  userForm!: FormGroup;
  gitUrl:string = "https://api.github.com/users/";


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private alert: AlertService) {
    this.userForm = this.formBuilder.group({
      githubUsername: ['', Validators.required],
      avatarUrl: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      education: ['', Validators.required],
      technologies: ['', Validators.required],
    })

  }


  buscarUserGitHub(): void {
    const username = this.userForm.value.githubUsername;

    if(!username){
      this.alert.showInfo("Informe seu nome de usuário do GitHub para preencher o formulário automaticamente.");
      return;
    }
    if (username) {
      this.http.get<any>(`${this.gitUrl}${username}`).subscribe((data) => {
        this.userForm.patchValue({
          avatarUrl: data.avatar_url,
          name: data.name || '',
          email: data.email || '',
          city: data.location || '',
        });
      });
    }
  }

  submit(): void {
    if(!this.userForm.valid){
      return console.log("Erro em criar Novo Desenvolvedor")
    }

    if (this.userForm.valid) {
      setTimeout(() => {
        this.alert.showSuccess("Cadastro realizado com sucesso!");
        this.userForm.reset();
      }, 500);

    }
  }
}
