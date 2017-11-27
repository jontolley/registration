import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { NgForm }   from '@angular/forms';

import { DataService } from '../../../services/data.service';
import { Contact } from '../../../models/contact';

@Component({
  selector: 'camp-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']  
})
export class ContactFormComponent implements OnInit {

  @ViewChild('contactForm') public contactForm: NgForm;

  errorMessage:string;

  phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  submitted:boolean;
  submitFailed:boolean;
  submiting:boolean;
  model:Contact;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initializeVariables();
  }

  onSubmit() {
    
    if (this.contactForm.invalid) {
      this.submitFailed = true;
      return;
    }

    this.model.phoneNumber = this.model.phoneNumber ? this.model.phoneNumber.replace(/\D/g,'') : undefined;

    this.submiting = true;

    this.dataService.sendContactMessage(this.model)
    .subscribe(
      data => { },
      error => {
        this.submiting = false;
        this.errorMessage = error;
        console.log(error);
      },
      () => {
        console.log('Contact Message Sent');
        this.submitted = true;
        this.submiting = false;
      }
    );
  }

  initializeVariables() {
    this.submitted = false;
    this.submitFailed = false;
    this.submiting = false;
    this.model = new Contact();
  }

  reset() {
    this.errorMessage = undefined;
    this.contactForm.reset();
    this.initializeVariables();
  }

}
