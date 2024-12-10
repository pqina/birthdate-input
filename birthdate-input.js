class BirthdateInput extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const defaultFields = ["day", "month", "year"];

    // get inputs
    const [day, month, year] = Array.from(
      this.querySelectorAll('input[type="number"]')
    );
    this.inputs = [day, month, year];
    this.inputRefs = { day, month, year };

    // add field keys
    for (const [index, input] of Object.entries(this.inputs)) {
      input.dataset.key = defaultFields[index];
    }

    // order parts based on the browser default locale
    const dateTimeFormat = new Intl.DateTimeFormat(
      this.getAttribute("locale") || undefined
    );
    const parts = dateTimeFormat.formatToParts();
    const order = parts
      .filter((part) => defaultFields.includes(part.type))
      .map((part) => part.type);

    // sort fields
    for (const key of order) {
      const input = this.inputRefs[key];

      // append the label
      this.append(this.querySelector(`label[for=${input.id}]`));

      // then append the input
      this.append(input);
    }

    // just focussed other field, prevent tabbing out of it by accident
    let preventTab = false;
    this.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && preventTab) {
        e.preventDefault();
        return;
      }
    });

    // auto jump to next field when user inputs numbers
    this.addEventListener("keyup", (e) => {
      // easier prop access
      const input = e.target;
      const { value, placeholder, dataset } = input;
      const currentIndex = order.indexOf(dataset.key);

      // move to previous field
      if (e.key === "Backspace" && value.length === 0) {
        const previousField = this.inputRefs[order[currentIndex - 1]];
        if (!previousField) return;
        previousField.focus();
      }

      // not a number, ignore
      if (!/[0-9]/.test(e.key)) return;

      // not filled out completely
      if (value.length !== placeholder.length) return;

      // get next field
      const nextField = this.inputRefs[order[currentIndex + 1]];
      if (!nextField) return;

      // focus this field
      preventTab = true;
      setTimeout(() => (preventTab = false), 250);
      nextField.focus();
    });
  }

  disconnectedCallback() {
    // restore original order
    for (const input of this.inputs) {
      this.append(input);
    }
  }
}

// auto define if not defined yet
if (!customElements.get("birthdate-input")) {
  customElements.define("birthdate-input", BirthdateInput);
}

// export so user can define own element if needed
export { BirthdateInput };
