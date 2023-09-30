import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  searchKey:string=''//for searching connecting api service and allproducts
  constructor(private api:ApiService){}
  allProducts:any=[] // variable to hold the values in result
  ngOnInit(): void {
    this.api.getAllProducts().subscribe((result:any)=>{
      console.log(result);/// contains array of 20 data
      this.allProducts=result
    })
    // this.searchKey=this.api.searchTerm
    this.api.searchTerm.subscribe((result:any)=>{
      console.log(result);
      this.searchKey=result
    })
  }

   
}
