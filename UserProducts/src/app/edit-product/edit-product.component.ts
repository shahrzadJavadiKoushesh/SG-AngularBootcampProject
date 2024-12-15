import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit{

  productForm: FormGroup;
  productId: number | null = null;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, public router: Router, private authService: AuthService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      code: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      weight: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  ngOnInit(): void{

    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.authService.getProductById(this.productId).subscribe(
        (p: any) => {
          if (p) {
            this.productForm.patchValue({
              name: p.name,
              code: p.code,
              weight: p.weight
            });
          } else {
            alert('Product not found');
            this.router.navigate(['/productsList']);
          }
        },
        (error: any) => {
          console.error('Error fetching product:', error);
          alert('Failed to load product details. Please try again.');
          this.router.navigate(['/productsList']);
        }
      );
    } else {
      alert('Invalid product ID');
      this.router.navigate(['/productsList']);
    }
  }

  onSubmitEdit(): void {
    if (this.productForm.valid && this.productId) {
      const updatedProduct = {
        id: this.productId,
        name: this.productForm.value.name,
        code: Number(this.productForm.value.code),
        weight: Number(this.productForm.value.weight)
      };
  
      this.authService.updateProduct(updatedProduct).subscribe(
        () => {
          console.log('Product updated successfully');
          this.router.navigate(['/productsList']);
        },
        (error) => {
          console.error('Error updating product:', error);
          alert('Failed to update product. Please try again.');
        }
      );
    }
  }
}
