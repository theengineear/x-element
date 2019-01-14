import { render, html } from '../../../lit-html/lit-html.js';

import { asyncAppend } from '../../../lit-html/directives/async-append.js';
import { asyncReplace } from '../../../lit-html/directives/async-replace.js';
import { guard } from '../../../lit-html/directives/guard.js';
import { ifDefined } from '../../../lit-html/directives/if-defined.js';
import { repeat } from '../../../lit-html/directives/repeat.js';
import { unsafeHTML } from '../../../lit-html/directives/unsafe-html.js';
import { until } from '../../../lit-html/directives/until.js';
import { when } from '../../../lit-html/directives/when.js';

const directives = {
  asyncAppend,
  asyncReplace,
  guard,
  ifDefined,
  repeat,
  unsafeHTML,
  until,
  when,
};

/**
 * Injects lit-html's html and directives into template function.
 */
export default superclass =>
  class extends superclass {
    render() {
      const tmpl = this.constructor.template(html, directives);
      const proxy = this.constructor.renderProxy(this);
      render(tmpl(proxy, this), this.shadowRoot);
    }

    /* eslint-disable no-shadow, no-unused-vars */
    static template(html, directives) {
      return (proxy, original) => html``;
    }
  };