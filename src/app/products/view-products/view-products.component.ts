import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {
  // variable to store product details
  product:any={}
  //to hold particular product id
  productId:string=''
constructor(private viewActivatedRoute:ActivatedRoute,private api:ApiService){}
  ngOnInit(): void {
    this.viewActivatedRoute.params.subscribe((data:any)=>{
      console.log(data);
      console.log(data.id);                      
      this.productId=data.id
    })
      //call view product
      this.api.viewProduct(this.productId).subscribe((result:any)=>{
        console.log(result);
        this.product=result
      },(result:any)=>{
        alert(result.error)
      })
    
  }
  //to add details to wish list while clicking the Add To Wishlist button
  addToWishlist(){
    const {id,title,price,image}=this.product
    this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
      alert(result)
    },(result:any)=>{
      alert(result.error)
    })
  }

  //add to cart details post
  addToCart(product:any){
  //add quantity to product
  Object.assign(product,{quantity:1})
  console.log(product);
  //api call
  this.api.addToCart(product).subscribe((result:any)=>{
    alert(result)
    this.api.cartCount()
  },(result:any)=>{
    alert(result.error)
  })   
  }
}
