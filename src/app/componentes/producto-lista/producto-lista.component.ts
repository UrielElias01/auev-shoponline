import { Component, ViewChild } from '@angular/core';
import { Producto, ProductoService } from '../../services/producto.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Dropdown } from 'primeng/dropdown';

@Component({
  selector: 'app-producto-lista',
  templateUrl: './producto-lista.component.html',
  styleUrls: ['./producto-lista.component.css']
})
export class ProductoListaComponent {
  products: Producto[] = [];
  productDialog: boolean = false;
  product: Producto = {
    id: '',
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    categoria: '',
    cantidad: 0,
    estadoInventario: '',
    rating: 0
  };
  selectedProducts: Producto[] = [];
  selectedStatus: string = '';
  submitted: boolean = false;
  statusOptions = [
    { label: 'In Stock', value: 'INSTOCK' },
    { label: 'Low Stock', value: 'LOWSTOCK' },
    { label: 'Out of Stock', value: 'OUTOFSTOCK' }
  ];

  @ViewChild('dt') dt: Table | undefined;
  @ViewChild('fileUpload') fileUpload: any;
  @ViewChild('statusDropdown') statusDropdown?: Dropdown;

  constructor(
    private productService: ProductoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit() {
    this.loadProducts();
  }

  applyFilterGlobal(event: Event, stringVal: string) {
    const target = event.target as HTMLInputElement;
    if (this.dt) {
      this.dt.filterGlobal(target.value, stringVal);
    }
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  openNew() {
    this.product = {
      id: '',
      codigo: '',
      nombre: '',
      descripcion: '',
      precio: 0,
      imagen: '',
      categoria: '',
      cantidad: 0,
      estadoInventario: '',
      rating: 0
    };
    this.submitted = false;
    this.productDialog = true;
    this.resetFileInput();
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.selectedProducts.forEach(product => {
          this.productService.deleteProduct(product.id!).subscribe();
        });
        this.selectedProducts = [];
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }

  editProduct(product: Producto) {
    this.product = { ...product };
    this.productDialog = true;
    this.resetFileInput();
  }

  deleteProduct(product: Producto) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(val => val.id !== product.id);
        this.productService.deleteProduct(product.id!).subscribe();
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
      }
    });
  }

  saveProduct() {
    this.submitted = true;
    this.product.estadoInventario = this.statusDropdown?.value || '';
    if (this.product.nombre?.trim()) {
      if (this.product.id) {
        this.productService.updateProduct(this.product).subscribe(data => {
          this.products[this.findIndexById(this.product.id!)] = data;
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          this.productDialog = false;
          this.product = {
            id: '',
            codigo: '',
            nombre: '',
            descripcion: '',
            precio: 0,
            imagen: '',
            categoria: '',
            cantidad: 0,
            estadoInventario: '',
            rating: 0
          };
        });
      } else {
        this.productService.createProduct(this.product).subscribe(data => {
          this.products.push(data);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          this.productDialog = false;
          this.product = {
            id: '',
            codigo: '',
            nombre: '',
            descripcion: '',
            precio: 0,
            imagen: '',
            categoria: '',
            cantidad: 0,
            estadoInventario: '',
            rating: 0
          };
        });
      }
    }
  }

  findIndexById(id: string): number {
    return this.products.findIndex(p => p.id === id);
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
    this.resetFileInput();
  }

  getSeverity(status: string): "success" | "info" | "warning" | "danger" | "secondary" | "contrast" | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

  getSeverityLabel(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'In Stock';
      case 'LOWSTOCK':
        return 'Low Stock';
      case 'OUTOFSTOCK':
        return 'Out of Stock';
      default:
        return '';
    }
  }

  handleFileSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.product.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  resetFileInput() {
    if (this.fileUpload) {
      this.fileUpload.clear(); // Restablece el valor del archivo
    }
  }

  clearImage(fileUpload: any) {
    this.product.imagen = '';
    fileUpload.clear();
  }
}
