import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: { label: string; link?: string }[] = [];
}
