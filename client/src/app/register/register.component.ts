import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  useEmailAsUN = false;
  confirmPassword = '';

  @Output() cancelRegister = new EventEmitter();
  model: any = {};

  constructor(
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  handleData() {
    console.log(this.useEmailAsUN);
    this.useEmailAsUN = !this.useEmailAsUN;

    if (this.useEmailAsUN) this.model.username = this.model.email;
    else this.model.username = '';
  }

  register() {
    if (
      this.model.username == '' ||
      this.model.password == '' ||
      this.model.email == '' ||
      this.confirmPassword == '' ||
      this.model.username == undefined ||
      this.model.password == undefined ||
      this.model.email == undefined ||
      this.confirmPassword == undefined
    ) {
      this.toastr.error('All fields are required');
      return;
    }
    if (this.confirmPassword == this.model.password) {
      if (this.useEmailAsUN) {
        this.model.username = this.model.email;
      }

      this.accountService.register(this.model).subscribe({
        next: () => {
          //this.cancel(),
          this.toastr.info('You have successfully registered.');
        },
        error: (error) => {
          if (error.error.text == 'Account successfully registered')
            this.toastr.info('You have successfully registered.');
          else this.toastr.error(error.error.text);
          console.log(error);
        },
      });
    } else {
      this.toastr.error('Password and comfirm password are not the same.');
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
