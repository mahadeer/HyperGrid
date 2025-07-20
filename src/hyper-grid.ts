import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { baseStyles } from './styles/base';

@customElement("hyper-grid")
export class HyperGrid extends LitElement {
  static override styles = baseStyles;

  @query("canvas.grid")
  _canvas!: HTMLCanvasElement;

  override render() {
    return html`<canvas class="grid"></canvas>`;
  }
}
