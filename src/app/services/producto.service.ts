import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
  cantidad: number;
  estadoInventario: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiURL = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiURL);
  }

  createProduct(product: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiURL, product);
  }

  updateProduct(product: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiURL}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
