import { Component, OnInit } from '@angular/core';
import { MockDataService } from '../mock-data.service';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [RouterModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {

  products: any[] = [];
  isAdmin: boolean = false;
  currentUser: any;

  constructor(private mockdata: MockDataService, private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.getCurrentUser()?.role === 1;
    this.currentUser = this.authService.getCurrentUser();
    this.fetchProducts();
  }

  fetchProducts(): void {
    this.authService.getHeaders();
    this.authService.http.get<any>('http://localhost:3000/api/products', {
      headers: this.authService.getHeaders(),
    }).subscribe({
      next: (products) => {
        console.log(products);

        this.products = Object.values(products);  
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  deleteProduct(productId: number): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.authService.deleteProduct(productId).subscribe(
        () => {
          console.log('product deleted successfully');
          this.fetchProducts(); 
        },
        (error) => {
          console.error('Error deleting product:', error);
          alert('Failed to delete product. Please try again.');
        }
      );
    }
  }

}
