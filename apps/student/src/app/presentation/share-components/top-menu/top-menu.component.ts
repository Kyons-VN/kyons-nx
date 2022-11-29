import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { NavigationService } from '@infrastructure/navigation/navigation.service';
import { UserService } from '@infrastructure/user/user.service';
import { AppPath } from '@presentation/routes';

@Component({
  selector: 'student-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
})
export class TopMenuComponent implements OnInit {
  showSubmenu = false;
  paths: AppPath;
  constructor(
    private userService: UserService,
    private renderer: Renderer2,
    navService: NavigationService
  ) {
    /**
     * This events get called by all clicks on the page
     */
    this.paths = navService.paths;
    this.renderer.listen('window', 'click', (e: Event) => {
      /**
       * Only run when toggleButton is not clicked
       * If we don't check this, all clicks (even on the toggle button) gets into this
       * section which in the result we might never see the menu open!
       * And the menu itself is checked here, and it's where we check just outside of
       * the menu and button the condition abbove must close the menu
       */
      if (
        e.target !== this.toggleButton.nativeElement &&
        e.target !== this.menu.nativeElement
      ) {
        this.showSubmenu = false;
      }
    });
  }

  /**
   * This is the toogle button elemenbt, look at HTML and see its defination
   */
  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;

  username = '';

  async ngOnInit(): Promise<void> {
    this.username = await this.userService.getUsername();
  }
}
