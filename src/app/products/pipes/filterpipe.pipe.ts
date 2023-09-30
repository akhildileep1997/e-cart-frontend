import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe'
})
export class FilterpipePipe implements PipeTransform {
 
  transform(allProducts:any[],searchTerm:string,propsName:string): any[]{
    const result:any[]=[]
    if(!allProducts||searchTerm==''||propsName=='')
    {
      return allProducts;
    }
    allProducts.forEach((item:any)=>{
      if(item[propsName].trim().toLowerCase().includes(searchTerm.trim().toLowerCase()))
      {
        result.push(item)
      }
      
    })
    return result;
  }

}
