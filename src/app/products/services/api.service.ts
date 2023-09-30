import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // using behavior subject to pass stream of data from one component to another
  cartItemCount = new BehaviorSubject(0) //to hold cart item count

  searchTerm = new BehaviorSubject('');//to hold search value

  constructor(private http:HttpClient) { 
    this.cartCount()
  }
  BASE_URL='https://ecart-hnuf.onrender.com'
  //api function for getting all products
  getAllProducts(){
   return this.http.get(`${this.BASE_URL}/products/all-products`)
  }
  //api function for viewing a particular product
  viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
  }
  //api function to add  products to wishlist
  addToWishlist(id:any,title:any,price:any,image:any){
    const body ={
      id,
      title,
      price,
      image
    }
    return this.http.post(`${this.BASE_URL}/wishlists/add-to-wishlist`,body)
  }

  //api function for getting products in wishlist
  viewWishlist(){
    return this.http.get(`${this.BASE_URL}/wishlists/view-all-wishlist`)
  }
  //api function for delete from wishlist
  deleteWishlist(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlists/delete-wishlist-product/${id}`)
  }
  //api function for add to cart
  addToCart(product:any){ // product is an object with properties
    const body ={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    return this.http.post(`${this.BASE_URL}/carts/add-to-cart`,body)
  }

  //api function for view cart items
  viewCartItems(){
    return this.http.get(`${this.BASE_URL}/carts/view-cart-items`)
  }

  //function for cart count
  cartCount(){
    this.viewCartItems().subscribe((result:any)=>{
      this.cartItemCount.next(result.length)
    })
  }

  //delete item from cart
  deleteCartItem(id:any){
    return this.http.delete(`${this.BASE_URL}/carts/delete-cart-item/${id}`)
  }

  //increment cart item
  incrementCartItem(id:any){
    return this.http.get(`${this.BASE_URL}/carts/increment-cart-product/${id}`)
  }

  decrementCartItem(id:any){
    return this.http.get(`${this.BASE_URL}/carts/decrement-cart-product/${id}`)
  }
}
