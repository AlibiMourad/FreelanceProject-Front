import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CompanyClient } from '../../../models/company-client';
import { CompanyClientService } from '../../../services/company-client.service';
import { Router } from '@angular/router';
import { BasicRegComponent } from '../../auth/registration/basic-reg/basic-reg.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-company-client',
  templateUrl: './add-company-client.component.html',
  styleUrls: ['./add-company-client.component.scss']
})
export class AddCompanyClientComponent implements OnInit {
  company: any;
  selectedFile: File;

  constructor(private router: Router,public activeModal: NgbActiveModal,
     private companyClientService : CompanyClientService,
     private modalService: NgbModal, private modalServiceClose: NgbActiveModal
     ) { 
        
}

  companyClient : CompanyClient = {
    companyId : null,
    companyName : '',
    companyWebSite : '',
    emailContact : '',
    firstNameContact : '',
    lastNameContact : '',
    phoneContact : null
  }

  ngOnInit() {
   
  }

  addCompanyClient(data : any){
    this.companyClientService.saveCompanyClient(data).subscribe(
     res => {
        const modalRef = this.modalService.open(BasicRegComponent);
        modalRef.componentInstance.company = res;
      },
      (err) =>    Swal.fire(
        'error !',
        'email already exist.',
        'error'
      )  
    );
  this.modalServiceClose.close();
}

}
