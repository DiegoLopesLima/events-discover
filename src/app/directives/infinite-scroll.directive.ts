import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  AfterViewInit,
  ContentChild,
  PLATFORM_ID,
  Inject,
} from '@angular/core';

@Directive({
  selector: '[appInfiniteScroll]',
  standalone: true,
})
export class InfiniteScrollDirective implements OnDestroy, AfterViewInit {
  @Input('infiniteRoot') root?: Element;
  @Input('infiniteRootMargin') rootMargin? = '0px';
  @Input('infiniteRootThreshold') threshold? = 0;
  @Output('infiniteTargetVisible') targetVisible = new EventEmitter();
  @ContentChild('infiniteTarget') targetRef!: ElementRef;
  private nativeObserver: IntersectionObserver | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.nativeObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.targetVisible.emit();
        }
      }, {
        root: this.root,
        rootMargin: this.rootMargin,
        threshold: this.threshold,
      });

      this.nativeObserver?.observe(this.targetRef?.nativeElement);
    }
  }

  ngOnDestroy() {
    this.nativeObserver?.disconnect();
  }
}
