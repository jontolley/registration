import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'camp-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  faq_WhoShouldAttend = false;
  faq_11yrOldScouts = false;
  faq_Theme = false;
  faq_Location = false;
  faq_Dates = false;
  faq_BasicSchedule = false;
  faq_Campsites = false;
  faq_Activities = false;
  faq_SwimTest = false;
  faq_Passport = false;
  faq_Spiritual = false;
  faq_Service = false;
  faq_Registration = false;
  faq_Medical = false;
  faq_Outreach = false;
  faq_Gateways = false;
  faq_TShirts = false;

  constructor() { }

  ngOnInit() {
  }

  faqClicked(faqQuestion) {
    let value = this[faqQuestion];
    this[faqQuestion] = !value;
  }

}
