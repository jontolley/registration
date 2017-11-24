import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm }   from '@angular/forms';

import { Contact } from '../contact';
import { DataService } from '../../../services/data.service';

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

  errorMessage:string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.initializeVariables();
  }

  onSubmit() {
    
    if (this.contactForm.invalid) {
      this.submitFailed = true;
      return;
    }

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
    this.contactForm.reset();
    this.initializeVariables();
  }

}
