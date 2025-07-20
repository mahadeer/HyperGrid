import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { baseStyles } from './styles/base';
// import init, { greet } from '../dist/wasm/grid_core.js';

@customElement("hyper-grid")
export class HyperGrid extends LitElement {
  static override styles = baseStyles;

  @query("canvas.grid")
  _canvas!: HTMLCanvasElement;

  @state()
  wasmGreeting: string = '';

  async connectedCallback() {
    super.connectedCallback();
    // try {
    //   await init('/dist/wasm/grid_core_bg.wasm');
    //   console.log(greet("Lit dsds User"));
    // } catch (e) {
    //   console.error("Error initializing WASM:", e);
    //   this.wasmGreeting = "Error loading WASM!!!";
    // }
  }

  override render() {
    return html`<canvas class="grid"></canvas>`;
  }
}
