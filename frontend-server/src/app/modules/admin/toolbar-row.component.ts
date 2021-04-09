import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { ToolbarTemplateService } from "../../services/top-bar/toolbar-template.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-toolbar-row',
  templateUrl: './toolbar-row.component.html',
  styleUrls: ['./toolbar-row.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarRowComponent implements OnInit {

  toolbarTemplate: TemplateRef<any>;

  @Output() onMenuClick: EventEmitter<void> = new EventEmitter();

  constructor(private toolbarTemplateService: ToolbarTemplateService,
              private cd: ChangeDetectorRef) { }

  private templateSubscription: Subscription;

  ngOnInit(): void {
    this.templateSubscription = this.toolbarTemplateService.onTemplateChanged()
      .subscribe(template => {
        this.toolbarTemplate = template;
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.templateSubscription.unsubscribe();
  }

  menuClick() {
    this.onMenuClick.emit();
  }
}
