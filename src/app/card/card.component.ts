import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { addToCart, removeFromCart } from '../cart.actions';
import { Store, select } from '@ngrx/store';
import {Observable,Subscription, map} from 'rxjs'
import { ToastrService } from 'ngx-toastr';
import { getCartItems } from '../cart.reducer';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  cardData: any = [];
  @Input()
  resData!: [];
  @Input()
  uniqueBrand!: []

  @Input()
  cartComponent: any

  userCartData: any

  @Output()
  filterByCategoryData: EventEmitter<string> = new EventEmitter()

  @Output()
  addToCart: EventEmitter<[]> = new EventEmitter()
  private subscription: Subscription;

  constructor(private store: Store<[]>,private toastr: ToastrService){
    this.subscription = this.store.pipe(select(getCartItems)).subscribe(data => {
      this.userCartData = data;
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      console.log('child',this.resData)
      this.cardData = this.resData
    },500)
  }

  ngOnChanges(changes: SimpleChanges): void {
      const newData = changes['resData'].currentValue;
      this.cardData = newData
  }

  categoryByFilter(e: any) {
    console.log(e.value)
    this.filterByCategoryData.emit(e.value)
  }
  
  userAddToCart(data: any) {
    const checkCartItem = this.userCartData?.find((u: any) => u.id === data.id);
    if(checkCartItem){
      this.toastr.warning('Already exist in your cart!','Cart Item',{timeOut: 800})
    }else{
      this.store.dispatch(addToCart({item: data}))
      this.toastr.success('Succfully add in your cart!','Cart Item',{timeOut: 800})
    }
  }

  userRemoveToCart(data: any){
    this.store.dispatch(removeFromCart({itemId: data.id}))
    this.toastr.success('Succfully remove item from your cart!','Cart Item',{timeOut: 800})
  }
}
