import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MockDataService } from '../mock-data.service';
import { Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {

  ProductForm: FormGroup;

  constructor(private fb: FormBuilder, private mockdata: MockDataService, private router: Router){
    this.ProductForm = this.fb.group({
      name: ['', Validators.required],
      code: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      weight: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  onSubmitAddProduct(){
    if (this.ProductForm.valid){
      const newProduct = this.ProductForm.value;
      console.log("Product added: " + newProduct);
      this.mockdata.addProduct(newProduct).subscribe((d) => {
        this.ProductForm.reset();
        this.router.navigate(['/api/products'], {state: {refresh: true}})
      }, 
      (error) => {
        console.log("Error adding product", error);
      })
      console.log(this.mockdata.products)
    }
  }

}
