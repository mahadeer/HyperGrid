import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("grid-spinner")
export class GridSpinner extends LitElement {
  static override styles = css`
    :host {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .loader {
      width: 96px;
      height: 16px;
      display: inline-block;
      background-color: #fff;
      border: 1px solid #333;
      border-radius: 4px;
      background-image: linear-gradient(45deg, rgba(0, 0, 0, 0.25) 25%, transparent 25%, transparent 50%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.25) 75%, transparent 75%, transparent);
      font-size: 30px;
      background-size: 1em 1em;
      box-sizing: border-box;
      animation: barStripe 1s linear infinite;
    }

    @keyframes barStripe {
      0% {
        background-position: 1em 0;
      }
      100% {
        background-position: 0 0;
      }
    }
    `;

  override render() {
    return html`<span class="loader"></span>`;
  }
}