import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { LoadingComponent } from '../presentation/share-components/loading/loading.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingOverlayService {
  private overlayRef: OverlayRef;
  _isActive = false;

  constructor(private overlay: Overlay) {
    this.overlayRef = this.overlay.create();
  }

  public show() {
    if (this._isActive) return;
    // Returns an OverlayRef (which is a PortalHost)
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }

    // Create ComponentPortal that can be attached to a PortalHost
    const spinnerOverlayPortal = new ComponentPortal(LoadingComponent);
    this.overlayRef.attach(spinnerOverlayPortal); // Attach ComponentPortal to PortalHost
    this._isActive = true;
  }

  public hide() {
    if (!this._isActive) return;
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this._isActive = false;
  }
}
