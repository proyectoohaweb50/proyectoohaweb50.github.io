class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        HOMELES INC.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
