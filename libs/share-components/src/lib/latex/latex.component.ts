import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { extractMath } from 'extract-math';
import katex from 'katex';
import { MarkdownService, ParseOptions } from 'ngx-markdown';

const parseOption: ParseOptions = {
  decodeHtml: false,
  inline: false,
  emoji: false,
  mermaid: false,
  disableSanitizer: true,
};
const mfencedBracesBracketRegex = /<mfenced open="{"(?:.*?)>(.*?)<\/mfenced>/g;

// Replacement function to insert enclosing tags
const replaceMfencedBracesBracketFunction = (match: string, content: string) => {
  return `<mrow><mo>{</mo>${content}<mo>}</mo></mrow>`;
};
const mfencedBracketRegex = /<mfenced>(.*?)<\/mfenced>/g;

// Replacement function to insert enclosing tags
const replaceMfencedBracketFunction = (match: string, content: string) => {
  return `<mrow><mo>(</mo>${content}<mo>)</mo></mrow>`;
};

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
          const markdown = await this.markdownService.parse(segments[i]['value'], parseOption);

          // Apply replace using the regular expression and function
          let modifiedMathML = markdown.replace(mfencedBracesBracketRegex, replaceMfencedBracesBracketFunction);
          modifiedMathML = modifiedMathML.replace(mfencedBracketRegex, replaceMfencedBracketFunction);
          this._html.push(modifiedMathML);
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

      this._safeHtml = this.domSanitizer.bypassSecurityTrustHtml(this._html.join("\n"));
    }
  }
}
