import { CommonModule } from '@angular/common';
import { Component, HostBinding, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoadingOverlayService } from '@data/loading-overlay.service';
import { NavigationService } from '@data/navigation/navigation.service';
import Balance from '@data/order/balance';
import { Inventory, Item } from '@data/order/inventory';
import Order from '@data/order/order';
import { OrderService } from '@data/order/order.service';
import { Package } from '@data/order/package';
import SubscriptionTime from '@data/order/subscription';
import { UserService } from '@data/user/user.service';
import { OrderStatus, PaymentMethod } from '@domain/order/i-order';
import { SafeHtmlPipe } from '@share-pipes';
import { interval, Subscription } from 'rxjs';

enum OrderProcessStatus {
  initial,
  warning,
  selectingPayment,
  ordering,
  // upgrading,
  success,
  fail,
  canceling,
  cancel,
}

@Component({
  selector: 'student-account-and-payment',
  standalone: true,
  imports: [CommonModule, SafeHtmlPipe, RouterModule, FormsModule],
  templateUrl: './account-and-payment.component.html',
})
export class AccountAndPaymentComponent implements OnInit, OnDestroy {
  orderService = inject(OrderService);
  paths = inject(NavigationService).paths;
  OrderStatus = OrderStatus;
  route = inject(ActivatedRoute);
  router = inject(Router);
  email = inject(UserService).getEmail();
  loading = inject(LoadingOverlayService);

  activeTab = signal(0);
  totalItems: number = 0;
  showBenefit: boolean = false;
  warning: boolean = false;
  showExtending: boolean = false;
  showUpgrade: boolean = false;
  showDowngrade: boolean = false;
  // showOrdering: boolean = false;
  orderCode: string = '';
  showTopup = false;
  orders!: Order[];
  isViewOrder = false;
  orderDetails!: Order;
  packages!: Package[];
  inventory!: Inventory;
  items: Item[] = [];
  currentPackage!: Package;
  selectedPackage!: Package;
  balance!: Balance;
  hasError = '';
  remainingHours: number = 0;
  remainingHoursDisplay: string = '';
  isCancelSuccess = false;
  isCancelFail = false;
  isCanceling = false;
  isConfirming = false;
  isPendingOrder = false;
  isOrderFail = false;
  amount = 0;
  countdown = 3;
  orderCountdown = '10 phút 0 giây';

  $interval!: Subscription;

  orderProcessStatus = signal(OrderProcessStatus.initial);
  OrderProcessStatus = OrderProcessStatus;
  payment = signal(PaymentMethod.momo);
  PaymentMethod = PaymentMethod;
  extendingCooldown = 10;

  @HostBinding('class') class = 'flex-1 w-full md:w-auto';

  ngOnInit(): void {
    this.loadPackages().add(() => {
      this.route.queryParams.subscribe({
        next: (params) => {
          if (params['packageLevel']) {
            window.localStorage.removeItem('selectedPackageLevel');
            this.router.navigate([this.paths.account.path]);
            this.selectPayment(this.packages.find(p => p.level === parseInt(params['packageLevel']))!);
          }
          // Momo callback: http://127.0.0.1:4200/account?partnerCode=MOMOU6R320240416_TEST&orderId=921534272653649&requestId=921534272653649&amount=24000&orderInfo=Quick%20Start&orderType=momo_wallet&transId=4041514291&resultCode=0&message=Th%C3%A0nh%20c%C3%B4ng.&payType=qr&responseTime=1715577456064&extraData=&signature=70452e4e70a2f3fbd950778d93e883c98fcf64ba4b266d7c2fd579f91b56f648
          if (params['partnerCode'] && params['orderId']) {
            if (params['resultCode'] == '0') this.orderProcessStatus.set(OrderProcessStatus.success);
            else {
              if (params['resultCode'] == '10') {
                this.hasError = 'Hệ thống đang được bảo trì.';
              }
              else if (params['resultCode'] == '1001') {
                this.hasError = 'Giao dịch thanh toán thất bại do tài khoản người dùng không đủ tiền.';
              }
              else if (params['resultCode'] == '1002') {
                this.hasError = 'Giao dịch bị từ chối do nhà phát hành tài khoản thanh toán.';
              }
              else if (params['resultCode'] == '1003') {
                this.hasError = 'Giao dịch bị đã bị hủy.';
              }
              else if (params['resultCode'] == '1004') {
                this.hasError = 'Giao dịch thất bại do số tiền thanh toán vượt quá hạn mức thanh toán của người dùng.';
              }
              else if (params['resultCode'] == '1005') {
                this.hasError = 'Giao dịch thất bại do url hoặc QR code đã hết hạn.';
              }
              else if (params['resultCode'] == '1006') {
                this.hasError = 'Giao dịch thất bại do người dùng đã từ chối xác nhận thanh toán.';
              }
              else if (params['resultCode'] == '1007') {
                this.hasError = 'Giao dịch bị từ chối vì tài khoản không tồn tại hoặc đang ở trạng thái ngưng hoạt động.';
              }
              else if (params['resultCode'] == '1017') {
                this.hasError = 'Giao dịch bị hủy bởi đối tác.';
              }
              else if (params['resultCode'] == '1026') {
                this.hasError = 'Giao dịch bị hạn chế theo thể lệ chương trình khuyến mãi.';
              }
              else if (params['resultCode'] == '1080') {
                this.hasError = 'Giao dịch hoàn tiền thất bại trong quá trình xử lý. Vui lòng thử lại trong khoảng thời gian ngắn, tốt hơn là sau một giờ.';
              }
              else if (params['resultCode'] == '1081') {
                this.hasError = 'Giao dịch hoàn tiền bị từ chối. Giao dịch thanh toán ban đầu có thể đã được hoàn.';
              }
              else if (params['resultCode'] == '2019') {
                this.hasError = 'Yêu cầu bị từ chối vì orderGroupId không hợp lệ.';
              }
              else if (params['resultCode'] == '4001') {
                this.hasError = 'Giao dịch bị hạn chế do người dùng chưa hoàn tất xác thực tài khoản.';
              }
              else if (params['resultCode'] == '4100') {
                this.hasError = 'Giao dịch thất bại do người dùng không đăng nhập thành công.';
              }
              else {
                this.hasError = params[`Có lỗi ${params['resultCode']}, vui lòng thử lại sau`]
              }
              this.orderProcessStatus.set(OrderProcessStatus.fail);
              return;
            }
            let count = 3;
            const interval = setInterval(() => {
              if (count < 0) {
                clearInterval(interval);
                this.backToHistory();
              }
              this.countdown = count--;
            }, 1000);
          }
        }
      })
    });
    this.loadGeneral();
  }

  ngOnDestroy(): void {
    if (this.$interval !== undefined) this.$interval.unsubscribe();
  }

  loadGeneral() {
    this.orderService.getInventory().subscribe({
      next: (inventory: Inventory) => {
        this.inventory = inventory;
        this.currentPackage = this.inventory.subscription.package;
        this.items = this.inventory.items;
        this.totalItems = this.items.length > 0 ? this.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
      },
    });
    this.orderService.getSubscriptionTime().subscribe({
      next: (subscriptionTime: SubscriptionTime) => {
        this.remainingHoursDisplay = toTime(subscriptionTime.remainingHours);
      },
    });
  }

  loadPackages() {
    this.orderService.getBalance().subscribe({
      next: (balance: Balance) => {
        this.balance = balance;
      },
      error: () => {
        // TODO: Define error resposes
        this.hasError = 'Có lỗi, vui lòng thử lại';
      },
    });
    return this.orderService.getPackages().subscribe({
      next: data => {
        this.packages = data;
      },
    });
  }

  copy(string: string) {
    navigator.clipboard.writeText(string);
    alert('Sao chép thành công!');
  }

  order() {
    this.loading.show();
    this.orderService.orderPackage(this.selectedPackage.id, 1, this.payment(), window.origin + this.paths.account.path).subscribe({
      next: (payUrl) => {
        if (payUrl == '') {
          this.isOrderFail = true;
          this.loading.hide();
        }
        else {
          window.location.href = payUrl;
        }
      },
      error: (err) => {
        console.log(err);
        this.loading.hide();

        if (err.error_code == "PendingOrderExists") {
          this.isPendingOrder = true;
        }
        this.orderProcessStatus.set(OrderProcessStatus.initial);
      },
    });
  }

  // order(orderPackage: Package) {
  //   this.orderService.orderPackage(orderPackage.id, ).subscribe({
  //     next:()=>{},
  //     error:()=>{},
  //   });
  // }

  loadOrderHistory() {
    return this.orderService.getOrderHistory().subscribe({
      next: data => {
        this.orders = data;
      },
      error: () => { },
    });
  }

  // confirmOrder() {
  //   this.isConfirming = true;
  //   this.orderService.confirmOrder(this.orderCode).subscribe({
  //     next: () => {
  //       this.orderProcessStatus.set(OrderProcessStatus.initial);
  //     },
  //     error: () => {
  //       this.orderProcessStatus.set(OrderProcessStatus.initial);
  //     },
  //   });
  // }

  // cancelOrder() {
  //   this.isCanceling = true;
  //   this.orderService.cancelOrder(this.orderCode).subscribe({
  //     next: (res) => {
  //       if (res === 'canceled') {
  //         this.isCancelSuccess = true;
  //       }
  //       else {
  //         this.isCancelFail = true;
  //       }
  //       this.orderProcessStatus.set(OrderProcessStatus.initial);
  //       this.loadOrderHistory();
  //     },
  //     error: () => {
  //       this.isCancelFail = true;
  //       this.isCanceling = false;
  //     },
  //   });
  // }

  viewOrder(order: Order) {
    this.isViewOrder = true;
    this.orderDetails = order;
    this.orderCode = order.code;
    if (order.status == OrderStatus.pending) {
      const requestInterval = interval(1000);
      this.$interval = requestInterval.subscribe(() => {
        const remainningSeconds = Math.round((order.createdAt.getTime() + 10 * 60 * 1000 - (new Date()).getTime()) / 1000);
        if (remainningSeconds < -3) {
          this.backToHistory();
          return;
        }
        const minutes = Math.round(remainningSeconds / 60);
        const seconds = remainningSeconds % 60;
        this.orderCountdown = `${minutes} phút ${seconds} giây`;
      });
    }
  }

  viewAndPay(order: Order) {
    window.location.href = order.payUrl;
  }

  backToHistory() {
    this.router.navigate([], {
      relativeTo: this.route,
    });
    this.isViewOrder = false;
    if (this.$interval) this.$interval.unsubscribe();
    this.isCancelSuccess = false;
    this.isPendingOrder = false;
    this.isCancelFail = false;
    this.isOrderFail = false;
    this.activeTab.set(3);
    this.orderProcessStatus.set(OrderProcessStatus.initial);
    this.loadOrderHistory();
  }

  upgrade(pk: Package) {
    if (this.currentPackage.level === 0) {
      this.selectPayment(pk);
    }
    else {
      this.selectedPackage = pk;
      this.showUpgrade = true;
    }
  }
  // downgrade(pk: Package) {
  //   this.showWarning = true;
  //   // this.selectedPackage = pk;
  // }

  // confirm() {
  //   this.selectPayment(this.selectedPackage);
  // }

  selectPayment(pk: Package) {
    this.selectedPackage = pk;
    this.orderProcessStatus.set(OrderProcessStatus.selectingPayment);
  }
  cancel(pk: Order) {
    this.orderService.cancelOrder(pk.code).subscribe({
      next: (res) => {
        if (res === 'canceled') {
          this.isCancelSuccess = true;
        }
        else {
          this.isCancelFail = true;
        }
        this.orderProcessStatus.set(OrderProcessStatus.initial);
        this.loadOrderHistory();
      },
      error: () => {
        this.isCancelFail = true;
        this.isCanceling = false;
      },
    })
  }

  showExtendingWithCooldown() {
    this.showExtending = true;
    this.extendingCooldown = 10;
    const timer = setInterval(() => {
      this.extendingCooldown -= 1;
      if (this.extendingCooldown <= 0) {
        clearInterval(timer);
      }
    }, 1000)
  }
}

function toTime(totalhours: number) {
  const days = Math.floor(totalhours / 24);
  const hours = totalhours % 24;
  const minutes = Math.floor((hours - Math.floor(hours)) * 60);
  const roundedHours = Math.floor(hours);
  return `Còn ${days > 0 ? ` ${days} ngày` : ''}${roundedHours > 0 ? ` ${roundedHours} giờ` : ''}${minutes >= 0 ? ` ${minutes} phút` : ''
    }`;
}