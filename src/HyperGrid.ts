import { LitElement, PropertyValues, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { baseStyles } from './styles/base';
import { defaultGridConfig, GridConfig } from './types/GridConfig';
import { HyperGridDataset } from './types/HyperGridDataset';
import { DataUtils } from './utils/DataUtils';
import { CanvasUtils } from './utils/CanvasUtils';
import "./components/NoPreview";
import "./components/GridSpinner";
import { GridUtils } from './utils/GridUtils';
// WASM imports
import init from '../dist/wasm/grid_core.js';

@customElement("hyper-grid")
export class HyperGrid extends LitElement {
  static override styles = baseStyles;

  private mergedConfig: GridConfig = defaultGridConfig;
  private hybridDataset!: HyperGridDataset;
  private _resizeObserver: ResizeObserver | null = null;

  @state()
  hasError: boolean = false;
  @state()
  isDataAvailable: boolean = false;

  @query("canvas.grid")
  _canvas!: HTMLCanvasElement;

  // @state()
  // wasmGreeting: string = '';

  @property({ type: Object })
  config: GridConfig = defaultGridConfig;

  @property({ type: Array })
  data: object[] = [];

  async connectedCallback() {
    super.connectedCallback();
    try {
      await init('/dist/wasm/grid_core_bg.wasm');
      if (this.data && this.data.length > 0) {
        this._processData(this.data);
      } else {
        this.isDataAvailable = false;
      }
    } catch (e) {
      console.error("Error initializing WASM:", e);
      this.hasError = true;
      this.isDataAvailable = false;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // Disconnect the ResizeObserver when the component is removed from DOM
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  private _processData(rawData: object[]) {
    if (rawData.length > 0) {
      this.hybridDataset = DataUtils.getHybridDataset(rawData);
      this.isDataAvailable = true;
    } else {
      this.isDataAvailable = false;
    }
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("data")) {
      const oldData = changedProperties.get("data");
      if (this.data !== oldData) {
        this._processData(this.data);
      }
    }
    if (changedProperties.has("config")) {
      this.mergedConfig = { ...defaultGridConfig, ...this.config };
    }
  }

  updated(changedProperties: PropertyValues<this>) {
    if (this.isDataAvailable && this._canvas) {
      if (!this._resizeObserver) {
        this._setupResizeObserver();
      }
      if (changedProperties.has("data") || changedProperties.has("config")) {
        this._drawGrid();
      }
    }
  }

  private _setupResizeObserver() {
    if (this._canvas) {
      this._resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          // Check if the observed element is our canvas
          if (entry.target === this._canvas) {
            // Only redraw if the size actually changed
            const newWidth = entry.contentRect.width;
            const newHeight = entry.contentRect.height;

            if (this._canvas.width !== newWidth || this._canvas.height !== newHeight) {
              console.log(`Canvas resized to: ${newWidth}x${newHeight}, redrawing.`);
              this._drawGrid();
            }
          }
        }
      });
      this._resizeObserver.observe(this._canvas);
    }
  }


  private _drawGrid() {
    if (!this._canvas) {
      console.warn("Canvas element not found for drawing.");
      this.hasError = true;
      return;
    }

    const ctx = this._canvas.getContext('2d');
    if (!ctx) {
      console.error("Could not get 2D canvas context.");
      this.hasError = true;
      return;
    }

    this._defineCanvasSize(ctx);
    CanvasUtils.clearCanvas(this._canvas);
    GridUtils.drawGrid(ctx, this.hybridDataset, this.mergedConfig);
  }

  private _defineCanvasSize(ctx: CanvasRenderingContext2D) {
    const displayWidth = this._canvas.offsetWidth;
    const displayHeight = this._canvas.offsetHeight;
    const dpr = window.devicePixelRatio || 1; // Get device pixel ratio for high-DPI screens
    // Set the canvas's internal drawing buffer size
    this._canvas.width = displayWidth * dpr;
    this._canvas.height = displayHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  override render() {
    if (this.isDataAvailable) {
      console.log("Data is available, rendering grid...");
      return html`<canvas class="grid"></canvas>`;
    }
    if (this.hasError) {
      return html`<no-preview></no-preview>`;
    }
    return html`<grid-spinner></grid-spinner>`;
  }
}
