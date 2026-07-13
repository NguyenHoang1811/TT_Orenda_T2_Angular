// customer-form-modal.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AsyncValidatorFn, AbstractControl } from '@angular/forms';
import { NzModalRef, NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Inject } from '@angular/core';
import { map, first } from 'rxjs/operators';
import { CustomerService } from '../../../services/customer-service'; 
import { Customer } from '../../../core/models/customer';
import { of } from 'rxjs';

type ModalMode = 'add' | 'edit' | 'view';

@Component({
  selector: 'app-customer-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzDividerModule, NzModalModule ],
  templateUrl: './customer-form-modal.html',
})
export class CustomerFormModalComponent implements OnInit {
  form!: FormGroup;
  mode: ModalMode;
  customer?: Customer;
  submitting = false;

  constructor(
    private fb: FormBuilder,
    private modalRef: NzModalRef,
    private customerService: CustomerService,
    @Inject(NZ_MODAL_DATA) public data: { mode: ModalMode; customer?: Customer }
  ) {
    this.mode = data.mode;
    this.customer = data.customer;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      customerCode: [
        this.customer?.customerCode ?? '',
        [Validators.required],
        [this.customerCodeAsyncValidator()], // valid trùng mã khách hàng
      ],
      customerName: [this.customer?.customerName ?? '', [Validators.required]],
      age: [this.customer?.age ?? null, [Validators.required, Validators.min(0), Validators.max(120)]],
      address: [this.customer?.address ?? '', [Validators.required]],
    });

    if (this.mode === 'view') {
      this.form.disable();
    }
  }

  private customerCodeAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) return of(null);
      return this.customerService
        .checkCodeExists(control.value, this.customer?.id)
        .pipe(
          first(),
          map(exists => (exists ? { duplicateCode: true } : null))
        );
    };
  }

  submit(): void {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(c => {
        c.markAsDirty();
        c.updateValueAndValidity();
      });
      return;
    }
    this.submitting = true;
    const formValue = this.form.getRawValue();

    const request$ =
      this.mode === 'add'
        ? this.customerService.add(formValue)
        : this.customerService.update({ ...formValue, id: this.customer!.id });

    request$.subscribe(() => {
      this.submitting = false;
      this.modalRef.close('success'); 
    });
  }

  close(): void {
    this.modalRef.close();
  }
}