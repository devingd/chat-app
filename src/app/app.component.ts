import { 
  Component, 
  HostListener,
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slide', [
      state('show', style({
        transform: 'translate3d(0, 0, 0)',
        width: '200px',
        padding: '1rem'
      })),
      state('hide', style({
        transform: 'translate3d(-100%, 0, 0)',
        width: '0',
        padding: '0'
      })),
      transition('show => hide', animate('400ms ease-in-out')),
      transition('hide => show', animate('400ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  user = {
    name: "Elrond",
    id: 1
  };
  showList: string = (window.screen.width < 750) ? 'hide' : 'show';
  userListIcon: string = (this.showList == 'show') ? 'clear' : 'dehaze';

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.showList = (event.target.innerWidth < 750) ? 'hide' : 'show';
    this.userListIcon = (this.showList == 'show') ? 'clear' : 'dehaze';
  }

  logout() {
    alert('this would log you out, if you had logged in.');
  }

  toggleUserList() {
    this.showList = (this.showList == 'show') ? 'hide' : 'show';
    this.userListIcon = (this.showList == 'show') ? 'clear' : 'dehaze';
  }
}
