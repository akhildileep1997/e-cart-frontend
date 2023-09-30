import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  //paypal variable
  public payPalConfig?: IPayPalConfig;
  showSuccess:boolean=false;
  showPayPalButton:boolean=false;

  
  
  proceedToPaymentStatus:boolean=false // used to hide address form while displaying filled content
  offerClicked:boolean=false //while clicking offer
  discountStatus:boolean=false  //used to hide discount coupon once clicked


  //used to store values entered in the form
  name:string='';
  houseNumber:string='';                                                      
  streetName:string='';
  state:string='';
  pinCode:string='';
  mobileNumber:string=''


  allProducts:any=[] //to hold products in the cart

  cartTotalPrice=0
  constructor(private api:ApiService,private fb:FormBuilder){}


  ngOnInit(): void {
    this.api.viewCartItems().subscribe((result:any)=>{
      console.log(result); //array of product
      this.allProducts=result
      this.getCartTotal();
    },(result:any)=>{
      alert(result.error)
    })
    //paypal function call
    this.initConfig();
  }

  //delete item from cart
  deleteCartItem(id:any){
    this.api.deleteCartItem(id).subscribe((result:any)=>{ //result contains remaining products
      this.allProducts=result
      this.api.cartCount() // update cart count
      this.getCartTotal()
      alert("item removed from cart")
    },(result:any)=>{
      alert(result.error)
    })
  }

  //get cart total
  getCartTotal(){
    let total = 0
    this.allProducts.forEach((item:any)=>{
    total += item.grandTotal
    this.cartTotalPrice=Math.ceil(total)
    })
  }

  //increment cart product while clicking + sign
  incrementCartItem(id:any){
   this.api.incrementCartItem(id).subscribe((result:any)=>{
    this.allProducts=result
    this.getCartTotal()
   },(result:any)=>{
    alert(result.error)
   })
  }

  decrementCartProduct(id:any){
  this.api.decrementCartItem(id).subscribe((result:any)=>{
  this.allProducts=result
  this.getCartTotal()
  this.api.cartCount()
  },(result:any)=>{
    alert(result.error)
  })
  }

  //address form (validation)
  addressForm = this.fb.group({
    name:['',[Validators.required,Validators.pattern('[a-zA-z ]*')]],
    houseNumber:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    streetName:['',[Validators.required,Validators.pattern('[a-zA-z0-9 ]*')]],
    state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pinCode:['',[Validators.required,Validators.pattern('[0-9 ]*')]],
    mobileNumber:['',[Validators.required,Validators.pattern('[0-9 ]*')]]
  })

  submitForm(){
  
    if(this.addressForm.valid){
    this.proceedToPaymentStatus=true;
    this.name = this.addressForm.value.name||'';
    this.houseNumber = this.addressForm.value.houseNumber||'';
    this.streetName =this.addressForm.value.streetName||'';
    this.state = this.addressForm.value.state||'';
    this.pinCode = this.addressForm.value.pinCode||'';
    this.mobileNumber = this.addressForm.value.mobileNumber||''
    
    }else{
      alert('Please enter valid details')
    }
 

   }
   offersClicked(){
    this.offerClicked=true;
   }

   discountCalculate(value:any){
    this.discountStatus=true;
    this.cartTotalPrice=Math.ceil(this.cartTotalPrice*(100-value)/100)
   }

  //paypal function
   private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  makePay(){
    this.showPayPalButton=true
  }
  }
  

