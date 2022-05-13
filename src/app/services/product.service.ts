import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../market/market.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'http://127.0.0.1:8000/products';
  apiUrl2 = 'http://127.0.0.1:8000/getProductById';

  constructor(private http:HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}`);
  }

  getProductWithId(productId): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl2}/${productId}`);
  }


  addProduct(product: Product){
    return this.http.post<Product>(`${this.apiUrl}`, product);
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
