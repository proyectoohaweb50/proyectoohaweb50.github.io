class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        HOMELESS INC CD.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
