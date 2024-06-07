import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto {
  id: string;
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
    //Generar una id aleatoria para el producto
    product.id = ''+ Math.random().toString(36).substr(2, 9)

    return this.http.post<Producto>(this.apiURL, product);
  }

  updateProduct(product: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiURL}/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
}
