import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'kyonsvn-tutorial',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    #homeTutorialWrapper
    class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[100]"
    [ngStyle]="{ height: isOverlap ? 0 : undefined }"
  >
    <div #homeTutorial class="tooltip-wrapper absolute" style="top:50%;left:50%">
      <div
        #tutorialContainer
        class="tooltip-container p-2 bg-lightBlue-1 rounded-lg text-white col gap-2 w-[225px]"
        [ngClass]="{
          'caret-down': tooltipPosition === 'top',
          'caret-up': tooltipPosition === 'bottom'
        }"
      >
        <span>{{ tooltipContent }}</span>
        <div class="flex items-center justify-between">
          <div class="flex gap-2" *ngIf="scriptElements">
            <button (click)="pre()" [disabled]="step === 0 && back === undefined" class="btn-icon">
              <i class="icon-ArrowLeft"></i>
            </button>
            <button (click)="next()" [disabled]="step === scriptEvents.length - 1" class="btn-icon">
              <i class="icon-ArrowRight"></i>
            </button>
          </div>
          <button *ngIf="forceComplete === false" (click)="skip()" replaceUrl="true">Bỏ qua</button>
        </div>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .tooltip-wrapper {
        transition: all 500ms ease 0s;
        opacity: 0;
      }
    `,
  ],
})
export class TutorialComponent implements AfterViewInit, OnDestroy {
  @ViewChild('homeTutorialWrapper') homeTutorialWrapperElm!: ElementRef;
  @ViewChild('homeTutorial') tooltipElm!: ElementRef;
  @Input() scriptElements!: HTMLElement[];
  @Input() scriptEvents!: ([string, () => void] | null)[];
  @Input() back?: () => void;
  @Input() isOverlap?: boolean = false;
  @Input() forceComplete?: boolean = false;
  @Output() skipCallback = new EventEmitter<void>();

  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  scriptElement!: HTMLElement;
  tooltipContent = 'Tooltip content';
  tooltipPosition = 'top';
  step = 0;
  hasListener = false;

  ngAfterViewInit(): void {
    if (this.forceComplete == undefined) {
      this.forceComplete = window.localStorage.getItem('forceCompleteTutorial') == 'true';
    }
    if (!this.scriptElements || this.scriptElements.length == 0) return;
    window.document.body.style.overflow = 'hidden';
    this._render();

    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
      this._rearrangeElement();
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['scriptElements'].currentValue) {
  //     window.document.body.style.overflow = 'hidden';
  //     this._render();

  //     this.resizeObservable$ = fromEvent(window, 'resize');
  //     this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
  //       this._rearrangeElement();
  //     });
  //   }
  // }

  _getOffsetParent(element: HTMLElement): HTMLElement {
    return element.offsetParent as HTMLElement;
  }

  _rearrangeElement() {
    const scriptElement: HTMLElement = this.scriptElements[this.step];
    const scriptEvent = this.scriptEvents[this.step];
    scriptElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // window.scrollTo({
    //   top: scriptElement.offsetTop,
    //   left: scriptElement.offsetLeft,
    //   behavior: 'instant',
    // });
    setTimeout(() => {
      if (this.scriptElement != undefined) {
        // this.scriptElement.removeEventListener('onclick', () => scriptEvent);
        this.scriptElement.remove();
        // this.scriptElement.clear;
      }
      this.scriptElement = scriptElement.cloneNode(true) as HTMLElement;
      // this.scriptElement = document.createElement('TUTORIAL-PLACEHOLDER');
      // this.scriptElement.innerHTML = scriptElement.innerHTML;
      this.scriptElement.style.position = 'absolute';
      this.scriptElement.id = 'scriptElement' + this.scriptElement.id;
      this.scriptElement.style.width = scriptElement.offsetWidth + 1 + 'px';
      this.scriptElement.style.height = scriptElement.offsetHeight + 'px';
      const offsetParents = [];
      let temp: HTMLElement = scriptElement;
      while (this._getOffsetParent(temp) != undefined) {
        temp = this._getOffsetParent(temp);
        offsetParents.push(temp);
      }
      const left = offsetParents.reduce((acc, cur) => acc + cur.offsetLeft, scriptElement.offsetLeft);
      const top = offsetParents.reduce((acc, cur) => acc + cur.offsetTop, scriptElement.offsetTop);
      this.scriptElement.style.top = (top - window.scrollY).toString() + 'px';
      this.scriptElement.style.left = left + 'px';
      this.scriptElement.querySelector('input')?.removeAttribute('name');
      this.scriptElement.querySelector('input')?.removeAttribute('id');
      this.scriptElement.removeAttribute('href');

      if (scriptEvent && scriptEvent[0] == 'click') {
        // Hard code for click event fire only 1
        let isClicked = false;
        this.scriptElement.onclick = () => {
          if (isClicked) return;
          isClicked = true;
          scriptEvent[1]();
          if (this.step < this.scriptEvents.length - 1) {
            this.step++;
            if (this.step < this.scriptElements.length) this._render();
          } else {
            window.document.body.removeAttribute('style');
          }
        };
      } else if (scriptEvent && scriptEvent[0] == 'change') {
        this.scriptElement.onchange = () => {
          console.log('changed');
          scriptEvent[1]();
          if (this.step < this.scriptEvents.length - 1) {
            this.step++;
            this._render();
          }
        };
      } else {
        // console.log('scriptElement', this.scriptElement);
        // if (this.scriptElement.tagName == 'TUTORIAL-PLACEHOLDER' && scriptEvent && this.scriptElement.onclick == null) {
        //   // Hard code for click event fire only 1
        //   let isClicked = false;
        //   this.scriptElement.onclick = () => {
        //     if (isClicked) return;
        //     isClicked = true;
        //     scriptEvent();
        //     if (this.step < this.scriptEvents.length - 1) {
        //       this.step++;
        //       this._render();
        //     }
        //   };
        // }
      }
      if ((this.homeTutorialWrapperElm.nativeElement as HTMLElement).children.length === 1)
        this.homeTutorialWrapperElm.nativeElement.appendChild(this.scriptElement);

      const tooltipElm = this.tooltipElm.nativeElement;
      if (this.tooltipPosition == 'bottom') {
        tooltipElm.style.top = (top + scriptElement.offsetHeight + 20 - window.scrollY).toString() + 'px';
      } else {
        tooltipElm.style.top = (top - tooltipElm.clientHeight - 20 - window.scrollY).toString() + 'px';
      }
      // this.scriptElement.style.top = scriptElement.offsetTop - window.scrollY + 'px';
      // this.scriptElement.style.left = scriptElement.offsetLeft + 'px';

      const tooltipLeft = left - tooltipElm.offsetWidth / 2 + scriptElement.offsetWidth / 2;
      tooltipElm.style.setProperty('--caret-left', '50%');
      tooltipElm.style.setProperty('--caret-right', '50%');

      if (window.innerWidth < tooltipLeft + tooltipElm.offsetWidth) {
        const newTooltipLeft = window.innerWidth - tooltipElm.offsetWidth;
        tooltipElm.style.left = newTooltipLeft + 'px';
        // tooltipElm.querySelector('.caret-up::after').style.left = 0 + 'px';
        const caretLeft = left - newTooltipLeft + scriptElement.offsetWidth / 2;
        tooltipElm.style.setProperty('--caret-left', caretLeft + 'px');
        tooltipElm.style.setProperty(
          '--caret-right',
          window.innerWidth - tooltipLeft - tooltipElm.offsetWidth / 2 + 'px'
        );
      } else if (tooltipLeft < 0) {
        tooltipElm.style.left = '0px';
        tooltipElm.style.setProperty(
          '--caret-right',
          tooltipElm.offsetWidth - left - scriptElement.offsetWidth / 2 + 'px'
        );
        tooltipElm.style.setProperty('--caret-left', left + scriptElement.offsetWidth / 2 + 'px');
      } else {
        tooltipElm.style.left = tooltipLeft + 'px';
      }
      tooltipElm.style.opacity = '1';
    }, 400);
  }

  skip() {
    window.document.body.removeAttribute('style');
    this.skipCallback.emit();
  }

  ngOnDestroy() {
    if (this.resizeSubscription$) this.resizeSubscription$.unsubscribe();
  }

  pre() {
    if (this.step == 0) {
      if (this.back != undefined) this.back();
      return;
    }
    // this._trigger();
    this.step--;
    this._render();
  }

  next() {
    this._trigger();
    if (this.step == this.scriptElements.length - 1) return;
    this.step++;
    this._render();
  }

  _render() {
    setTimeout(() => {
      this.tooltipContent = this.scriptElements[this.step].getAttribute('data-tooltip-content') ?? 'Tooltip content';
      this.tooltipPosition = this.scriptElements[this.step].getAttribute('data-tooltip-position') ?? 'top';
      this._rearrangeElement();
    }, 200);
  }

  _trigger() {
    const event = this.scriptEvents[this.step];
    if (event != null) {
      {
        event[1]();
      }
    }
  }
}
