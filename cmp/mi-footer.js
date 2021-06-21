class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        OMAR H.A. 3CV50
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
