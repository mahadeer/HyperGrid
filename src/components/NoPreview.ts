import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("no-preview")
export class NoPreview extends LitElement {
  static override styles = css`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #5c5b5b;
      font-size: clamp(2rem, 3vw, 5rem);
      font-style: oblique;
    }
  `;

  override render() {
    return html`<div>No Preview Available</div>`;
  }
}