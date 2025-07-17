import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa-calculator';

  showNavAndFooter: any;

  versionNo: any;

  constructor(
    public router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateView();
    });
    this.versionNo = environment.version;
  }

 
  updateView() {
    let currentRoute = this.activatedRoute;
    while (currentRoute.firstChild) {
      currentRoute = currentRoute.firstChild;
    }
    const routePath = currentRoute.snapshot.routeConfig?.path;
    this.showNavAndFooter = routePath !== '';
  }
  

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
