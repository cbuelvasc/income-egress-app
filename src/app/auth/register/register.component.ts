import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  registerFrom: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerFrom = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createUser() {
    if (this.registerFrom.invalid) {
      return;
    }
    Swal.fire({
      title: 'Loading!',
      timerProgressBar: true,
      onBeforeOpen: () => {
        Swal.showLoading();
      }
    });

    const {name, email, password} = this.registerFrom.value;
    this.authService.createUser(name, email, password)
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
