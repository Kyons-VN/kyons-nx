import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { extractMath } from 'extract-math';
import katex from 'katex';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'kyonsvn-latex',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './latex.component.html',
})
export class LatexComponent implements OnChanges {
  domSanitizer = inject(DomSanitizer);
  markdownService = inject(MarkdownService);

  @Input({ required: true }) inputString!: string;

  _html: string[] = [];
  _safeHtml: SafeHtml | undefined;

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['inputString']) {
      this._html = [];
      // Break the string into segments ('text', 'inline', and 'display')
      const segments = extractMath(this.inputString.toString(), {
        delimiters: {
          inline: ['$', '$'],
          display: ['$$', '$$']
        }
      })

      // Parse the LaTeX equation to HTML
      for (let i = 0; i < segments.length; i++) {
        if (segments[i]['type'] == 'text') {
          this._html.push(segments[i]['value'])
        }
        else if (segments[i]['type'] == 'inline') {
          this._html.push(katex.renderToString(segments[i]['value'], { output: "mathml", throwOnError: false, displayMode: false }))
        }
        else if (segments[i]['type'] == 'display') {
          this._html.push(katex.renderToString(segments[i]['value'], { output: "mathml", throwOnError: false, displayMode: true }))
        }
        else {
          console.warn("An error occurred when parsing the LaTex input. The type of the segment is not recognized.");
        }
      }
      const html = await this.markdownService.parse(this._html.join("\n"));

      this._safeHtml = this.domSanitizer.bypassSecurityTrustHtml(html);
    }
  }
  // ngOnInit() {
  //   this.render();
  // }
}
