import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Promotion } from '@domain/gift/promotion';
import { GiftService } from '@infrastructure/gift/gift/gift.service';
import { LoadingOverlayService } from '@infrastructure/loading-overlay.service';
import { NavigationService } from '@infrastructure/navigation/navigation.service';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.scss'],
})
export class GiftComponent implements OnInit, AfterViewInit {
  route = inject(ActivatedRoute);
  continue = inject(ActivatedRoute).snapshot.queryParamMap.get('continue') ?? '';
  router = inject(Router);
  giftService = inject(GiftService);
  paths = inject(NavigationService).paths;
  loading = inject(LoadingOverlayService);
  promotion!: Promotion;
  event = this.route.snapshot.paramMap.get('event') ?? '';

  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('spinBG') spinBG!: ElementRef<HTMLImageElement>;
  ctx!: CanvasRenderingContext2D;
  options = [
    'Voucher in 20 ảnh BOFT trị giá 300.000 đồng',
    'Sổ tay SEESAW trị giá 90.000 đồng',
    'Voucher Gongcha trị giá 50.000 đồng',
    'Một cặp Sleeping mask độc quyền từ Kyons trị giá 180.000 đồng',
    'May mắn lần sau',
    'Học bổng của Kyons trị giá 1.000.000 đồng',
  ];
  startAngle = 0;
  arc = Math.PI / (this.options.length / 2);
  spinTimeout!: any;
  // spinArcStart = 10;
  spinTime = 0;
  spinTimeTotal = 0;
  showResult = false;
  spinAngleStart = 0;
  values = [
    'Học bổng của Kyons trị giá 1.000.000 đồng',
    'Sổ tay SEESAW trị giá 90.000 đồng',
    'Voucher Gongcha trị giá 50.000 đồng',
    'Một cặp Sleeping mask độc quyền từ Kyons trị giá 180.000 đồng',
    'Voucher in 20 ảnh BOFT trị giá 300.000 đồng',
    'May mắn lần sau',
  ];
  showGifts = false;

  ngOnInit(): void {
    this.loading.show();
    this.giftService.getPromotion(this.event).subscribe({
      next: (res: any) => {
        // res = {
        //   is_won: true,
        //   data: [
        //     {
        //       id: 1,
        //       name: 'Sổ tay SEESAW trị giá 90.000 đồng',
        //     },
        //   ],
        //   claim_code: 'AAA',
        // };
        if (res) {
          this.promotion = Promotion.fromJson(res);
        } else {
          this.showResult = true;
        }
      },
      error: err => {
        console.log(err);
      },
    });
  }

  spinStart(): void {
    if (this.spinTime > 0) {
      return;
    }
    this._spin();
  }

  ngAfterViewInit(): void {
    this.spinBG.nativeElement.onload = () => {
      this._drawRouletteWheel();
      this.loading.hide();
    };
  }

  _reset() {
    this.startAngle = 0;
    this.arc = Math.PI / (this.options.length / 2);
    this.spinTimeout = null;
    this.spinTime = 0;
    this.spinTimeTotal = 0;
    this.showResult = false;
    this.spinAngleStart = 0;
    this._drawRouletteWheel();
  }

  _spin() {
    const random: { [key: string]: number } = {
      'Học bổng của Kyons trị giá 1.000.000 đồng': 28,
      'Sổ tay SEESAW trị giá 90.000 đồng': 25,
      'Voucher Gongcha trị giá 50.000 đồng': 24,
      'Một cặp Sleeping mask độc quyền từ Kyons trị giá 180.000 đồng': 23,
      'Voucher in 20 ảnh BOFT trị giá 300.000 đồng': 27,
      'May mắn lần sau': 29,
    };
    // console.log(random);

    this.spinAngleStart = random[this.promotion.isWon ? this.promotion.gifts[0].name : 'May mắn lần sau'];
    // this.spinAngleStart = random[this.values[1]];
    this.spinTime = 0;
    this.spinTimeTotal = 6 * 1000;
    this._rotateWheel();
  }

  _drawRouletteWheel() {
    if (this.canvas.nativeElement) {
      const outsideRadius = 200;
      const textRadius = 160;
      const insideRadius = 60;

      const ctx = this.canvas.nativeElement.getContext('2d');
      if (ctx == null) return;
      this.ctx = ctx;

      ctx.clearRect(0, 0, 500, 500);

      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;

      ctx.font = 'bold 12px Helvetica, Arial';

      for (let i = 0; i < this.options.length; i++) {
        const angle = this.startAngle + i * this.arc;
        //ctx.fillStyle = colors[i];

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + this.arc, false);
        ctx.arc(250, 250, insideRadius, angle + this.arc, angle, true);
        ctx.stroke();
        // ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = 0;
        ctx.shadowColor = 'rgb(220,220,220)';
        ctx.fillStyle = 'black';
        ctx.translate(
          250 + Math.cos(angle + this.arc / 2) * textRadius,
          250 + Math.sin(angle + this.arc / 2) * textRadius
        );
        ctx.rotate(angle + this.arc / 2 + Math.PI / 2);
        // const text = this.options[i];
        // ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }
    }
  }

  _rotateWheel() {
    this.spinTime += 30;
    if (this.spinTime >= this.spinTimeTotal) {
      this._stopRotateWheel();
      setTimeout(() => {
        this.showResult = true;
      }, 1000);
      return;
    }
    const spinAngle = this.spinAngleStart - _easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
    this.startAngle += (spinAngle * Math.PI) / 180;
    this.spinBG.nativeElement.style.transform = `rotate(${(this.startAngle * 180) / Math.PI}deg)`;
    this._drawRouletteWheel();
    // _rotateImage(this.spinBG.nativeElement, spinAngle);
    this.spinTimeout = setTimeout(this._rotateWheel.bind(this), 30);
  }

  _stopRotateWheel() {
    clearTimeout(this.spinTimeout);
    // const degrees = (this.startAngle * 180) / Math.PI + 90;
    this.arc = (this.arc * 180) / Math.PI;
    // const index = Math.floor((360 - (degrees % 360)) / this.arc);
    this.ctx.save();
    // this.ctx.font = 'bold 30px Helvetica, Arial';
    // const text = this.options[index];
    // this.ctx.fillText(text, 250 - this.ctx.measureText(text).width / 2, 250 + 10);
    this.ctx.restore();
  }
}

function _easeOut(t: number, b: number, c: number, d: number) {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}
