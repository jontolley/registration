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

  submitted = false;
  model = new Contact();

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    // console.log("firstName", firstName);

    this.submitted = true;
    console.log(this.model);
  }

  reset() {
    this.contactForm.reset();
    this.submitted = false;
    this.model = new Contact();
  }

}
