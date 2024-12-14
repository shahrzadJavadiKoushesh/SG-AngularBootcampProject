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
    this.isAdmin = this.authService.getCurrentUser()?.role === 'admin';
    this.currentUser = this.authService.getCurrentUser();
    this.fetchProducts();
  }

  fetchProducts(): void{
    this.mockdata.getProducts().subscribe((products) => {
      this.products = products;
    })
  }

  deleteProduct(id: number): void{
    if (this.isAdmin){
      this.mockdata.deleteProduct(id).subscribe(() => {
        console.log("User with id " + id + " deleted");
        this.fetchProducts();
      })
    }

  }

}
