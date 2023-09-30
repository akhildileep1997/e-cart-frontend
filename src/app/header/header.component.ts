import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private api:ApiService){}
  cartCountValue:any //to assign cart count value
  ngOnInit(): void {
    this.api.cartItemCount.subscribe((data:any)=>{
      console.log(data);//contains cart count
      this.cartCountValue=data
    })
  }
search(event:any){
  console.log(event);
  this.api.searchTerm.next(event.target.value)
}

}
