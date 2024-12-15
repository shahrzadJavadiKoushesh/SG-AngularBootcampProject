import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockDataService } from '../mock-data.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {

  ProductForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.ProductForm = this.fb.group({
      name: ['', Validators.required],
      code: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      weight: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  onSubmitAddProduct() {
    if (this.ProductForm.valid) {
      const newProduct = this.ProductForm.value;
      console.log("Product added: " + newProduct);
      this.authService.addProduct(newProduct).subscribe((res) => {
        console.log("product added");
        this.ProductForm.reset();
        this.router.navigate(['/productsList'], { state: { refresh: true } });
      },
        (err) => {
          console.error('Error adding product:', err);
          alert('Failed to add product. Please try again.');
        })
    }
  }

}
