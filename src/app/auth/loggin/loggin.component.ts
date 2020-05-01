import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-loggin',
  templateUrl: './loggin.component.html',
  styles: []
})
export class LogginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    Swal.fire({
      title: 'Loading!',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const {email, password} = this.loginForm.value;
    this.authService.loginUser(email, password)
      .then(credentials => {
        Swal.close();
        this.router.navigate(['/']);
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        });
      });
  }
}
