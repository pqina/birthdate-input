# Birtdate-Input

A Custom Element to handle birthdate input.

```
npm install @pqina/birthdate-input
```

Or download and copy the `birthdate-input.js` file to your project.

Optionally set the `locale` attribute to override the browser locale.

More information on [pqina.nl/building-birthdate-input-custom-element](https://pqina.nl/building-birthdate-input-custom-element/)

```html
<fieldset>
  <legend>Birthdate</legend>
  <birthdate-input locale="nl-NL">
    <!-- Order of fields when JavaScript fails to load -->

    <label for="day">Day</label>
    <input id="day" min="1" max="31" type="number" placeholder="dd" />

    <label for="month">Month</label>
    <input id="month" min="1" max="12" type="number" placeholder="mm" />

    <label for="year">Year</label>
    <input id="year" min="1800" max="2025" type="number" placeholder="yyyy" />
  </birthdate-input>
</fieldset>

<script type="module" src="birthdate-input.js"></script>
```
