import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  allWishlist:any=[]
constructor(private api:ApiService,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.getAllProducts()
  }
  getAllProducts(){
    this.api.viewWishlist().subscribe((data:any)=>{
      console.log(data);//wishlist product details
      this.allWishlist=data
    },(data:any)=>{
      console.log(data.error);
    })
  }

  deleteWishlist(id:any){
  this.api.deleteWishlist(id).subscribe((data:any)=>{
    this.allWishlist=data //assign remaining wishlist item to wishlist
    alert("product removed from wishlist")
  })
  }
  addToCart(allwishlist:any){
    Object.assign(allwishlist,{quantity:1})
    this.api.addToCart(allwishlist).subscribe((result:any)=>{
      alert(result)
      this.api.cartCount()
    },(result:any)=>{
      alert(result.error)
    })
    this.api.cartCount()
  }
}
