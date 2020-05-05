import { Input, Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() error: string | null;
  @Output() submitEM = new EventEmitter();
  frm: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.frm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  submit() {
    if (this.frm.valid) {
      this.submitEM.emit(this.frm.value);
    }
  }

  login() {
    if (this.frm.valid) {
      this.auth.login(this.frm.value).subscribe(res => {
        localStorage.setItem('API_KEY', res.apiKey);
        this.router.navigate(['/main-page']);
      }, (err) => {
        this.error = 'The username or password is incorrect';
      });
    }
  }

}
