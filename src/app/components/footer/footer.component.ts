import { Component, Input } from '@angular/core';
import { ContainerComponent } from '../container/container.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  @Input() appName = '';
  currentFullYear = new Date().getFullYear();
}
