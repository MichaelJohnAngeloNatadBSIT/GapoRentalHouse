import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../market/market.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://192.168.1.178:80/products';
  apiUrl2 = 'http://192.168.1.178:80/getProductById';
  apiUrl3 = 'http://192.168.1.178:80/add-product';
  apiUrl4 = 'http://192.168.1.178:80/getProductByUserId';

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  getProductWithId(productId:number): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl2}/${productId}`);
  }
  getProductWithUserId(userId:number): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl4}/${userId}`);
  }

  addProduct(product: Product, userId: number){
    return this.http.post<Product>(`${this.apiUrl3}/${userId}`, product);
  }

  updateProduct(productId: number, product: Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product);
  }

  updateProductImage(productId: number, product: Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product);
  }

  deleteProduct(productId: number):Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}/${productId}`);
  }
}
