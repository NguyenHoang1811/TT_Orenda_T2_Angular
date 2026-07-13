// customer-list.component.ts
import { Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';
import { CustomerService } from '../../../services/customer-service';
import { Customer } from '../../../core/models/customer';
import { CustomerFormModalComponent } from '../customer-form-modal/customer-form-modal';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, NzTableModule, NzButtonModule, NzDividerModule, NzModalModule],
  templateUrl: './customer-list.html',
  styleUrls: ['./customer-list.css'],
})
export class CustomerListComponent implements OnInit {
  listOfData: Customer[] = [];
  total = 0;
  pageIndex = 1;
  pageSize = 5;
  loading = false;

  constructor(
    private customerService: CustomerService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.customerService.customers$.subscribe(customers => {
      const start = (this.pageIndex - 1) * this.pageSize;
      this.listOfData = customers.slice(start, start + this.pageSize);
      this.total = customers.length;
      this.loading = false;
    });

    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.customerService.getPage(this.pageIndex, this.pageSize)
      .pipe(finalize(() => this.loading = false))
      .subscribe(res => {
        this.listOfData = res.data;
        this.total = res.total;
      });
  }

  onPageIndexChange(index: number): void {
    this.pageIndex = index;
    this.loadData(); // mỗi lần đổi trang -> gọi lại service lấy dữ liệu trang đó
  }

  openAddModal(): void {
    const modalRef = this.modal.create({
      nzTitle: 'Thêm khách hàng',
      nzContent: CustomerFormModalComponent,
      nzData: { mode: 'add' },
      nzFooter: null,
    });
    modalRef.afterClose.subscribe(result => {
      if (result === 'success') this.loadData();
    });
  }

  openEditModal(customer: Customer): void {
    const modalRef = this.modal.create({
      nzTitle: 'Sửa khách hàng',
      nzContent: CustomerFormModalComponent,
      nzData: { mode: 'edit', customer },
      nzFooter: null,
    });
    modalRef.afterClose.subscribe(result => {
      if (result === 'success') this.loadData();
    });
  }

  openViewModal(customer: Customer): void {
    this.modal.create({
      nzTitle: 'Chi tiết khách hàng',
      nzContent: CustomerFormModalComponent,
      nzData: { mode: 'view', customer },
      nzFooter: null,
    });
  }

  confirmDelete(customer: Customer): void {
    this.modal.confirm({
      nzTitle: 'Xác nhận xoá',
      nzContent: `Bạn có chắc muốn xoá khách hàng "${customer.customerName}"?`,
      nzOkDanger: true,
      nzOnOk: () => {
        this.customerService.delete(customer.id).subscribe(() => this.loadData());
      },
    });
  }
}