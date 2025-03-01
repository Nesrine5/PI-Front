import { Injectable, Type } from '@angular/core';



import {ComponentPortal, Portal, TemplatePortal} from '@angular/cdk/portal';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private panel: MatSidenav;
  selectedPortal: Portal<any>;

  constructor() {}

  setSidePanel(sidenav: MatSidenav) {
    this.panel = sidenav;
  }

  
  private setPortal(componentType) {
    this.selectedPortal = new ComponentPortal(componentType);
  }

  open(componentType: Type<any>) {
    this.setPortal(componentType);
    return this.panel.open();
  }

  close() {
    return this.panel.close();
  }

  toggle() {
    return this.panel.toggle();
  }
}
