import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';

import { Contact } from '../contact';

@Component({
  selector: 'camp-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']  
})
export class ContactFormComponent implements OnInit {

  @ViewChild('contactForm') public contactForm: NgForm;

  submitted:boolean;
  submitFailed:boolean;
  submiting:boolean;
  model:Contact;

  constructor() { }

  ngOnInit() {
    this.initializeVariables();
  }

  onSubmit() {
    
    if (this.contactForm.invalid) {
      this.submitFailed = true;
      return;
    }

    this.submiting = true;
    // TODO: submit message to api

    this.submitted = true;
  }

  initializeVariables() {
    this.submitted = false;
    this.submitFailed = false;
    this.submiting = false;
    this.model = new Contact();
  }

  reset() {
    this.contactForm.reset();
    this.initializeVariables();
  }

}
