import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { LoadingComponent } from '@view/share-components/loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  document = inject(DOCUMENT);
  overlay = inject(Overlay);
  overlayRef = this.overlay.create();
  _isActive = false;

  public show() {
    if (this._isActive) return;
    // Returns an OverlayRef (which is a PortalHost)
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(LoadingComponent);
    this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    this.document.body.classList.add('overflow-hidden');
    this._isActive = true;
  }

  public hide() {
    if (!this._isActive) return;
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.document.body.classList.remove('overflow-hidden');
    this._isActive = false;
  }
}
