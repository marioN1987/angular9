import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Form, Validators } from '@angular/forms';
import { ContactService, ContactItem, ContactItemResponse } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  
  form: FormGroup;
  
  msg: string;
  contactLst: any;

  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit(): void {
    
     this.contactService.get().subscribe( items=> this.contactLst = items["records"]);

     this.form = this.formBuilder.group({
       name: this.formBuilder.control('', Validators.compose([ Validators.required, Validators.pattern('[\\w\\-\\s\\/]+') ])),
       email: this.formBuilder.control('', Validators.compose([ Validators.required, Validators.pattern("[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*") ])),
       message: this.formBuilder.control('', Validators.required)
     })
  }

  onSubmit(contactData){
     console.log(contactData);
     this.contactService.add(contactData).subscribe( r => this.msg = r.message);
     this.clearForm();

     this.contactService.get().subscribe( items=> this.contactLst = items["records"]);
  }

  clearForm() {

    this.form.reset({
          'name': '',
          'email': '',
          'message': '',
         });
    }

}
