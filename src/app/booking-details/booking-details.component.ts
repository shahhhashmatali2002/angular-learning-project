import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  userPaymentInfoData: any

  constructor(private route: ActivatedRoute, private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    debugger
    this.route.paramMap.subscribe(params => {
      const data: any = params.get('dataStr')
      this.userPaymentInfoData = JSON.parse(data)
      console.log(JSON.parse(data));
    });

    // const state = this.router?.getCurrentNavigation();
    // if (state && state.extras && state.extras.state) {
    //    // Object data
    //    const paramsData = state.extras.state['data'];
    //   this.userPaymentInfoData = JSON.parse(paramsData)
    //   console.log('UserPayment Info ',this.userPaymentInfoData);
    // }
  }

  confirmOrder() {
    this.toastr.success('Thanks for shopping', 'Sopping!')
    this.router.navigate(['/home'])
  }

}
