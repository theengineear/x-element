import { it, assert } from '../../../@netflix/x-test/x-test.js';
import './fixture-element-attr-reflection.js';

it('reflects initial value', () => {
  const el = document.createElement('test-element-attr-reflection');
  document.body.appendChild(el);
  assert(el.getAttribute('camel-case-property') === 'reflectedCamel');
});

it('renders the template with the initial value', () => {
  const el = document.createElement('test-element-attr-reflection');
  document.body.appendChild(el);
  assert(el.shadowRoot.querySelector('span').textContent === 'reflectedCamel');
});

it('reflects initial value (Boolean, true)', () => {
  const el = document.createElement('test-element-attr-reflection');
  document.body.appendChild(el);
  assert(el.hasAttribute('boolean-property-true'));
});

it('does not reflect initial value (Boolean, false)', () => {
  const el = document.createElement('test-element-attr-reflection');
  document.body.appendChild(el);
  assert(el.hasAttribute('boolean-property-false') === false);
});

it('reflects next value after a micro tick', async () => {
  const el = document.createElement('test-element-attr-reflection');
  document.body.appendChild(el);
  el.camelCaseProperty = 'dromedary';
  assert(
    el.getAttribute('camel-case-property') === 'dromedary' &&
      el.shadowRoot.querySelector('span').textContent === 'reflectedCamel'
  );
  await true;
  assert(el.shadowRoot.querySelector('span').textContent === 'dromedary');
});

it('has reflected override value after connected', () => {
  const el = document.createElement('test-element-attr-reflection');
  document.body.appendChild(el);
  assert(el.getAttribute('override-property') === 'overridden');
});

it('does not reflect next false value (Boolean)', () => {
  const el = document.createElement('test-element-attr-reflection');
  document.body.appendChild(el);
  el.booleanPropertyTrue = true;
  assert(el.hasAttribute('boolean-property-true'));
  el.booleanPropertyTrue = false;
  assert(el.hasAttribute('boolean-property-true') === false);
});

it('throws when trying to reflect a typeless property', () => {
  const el = document.createElement('test-element-attr-reflection');
  document.body.appendChild(el);
  const message =
    'Attempted to serialize "typelessProperty" and reflect, but it is not a Boolean, String, or Number type (undefined).';
  let errored = false;
  el.addEventListener('error', evt => {
    if (evt.error.message === message) {
      errored = true;
      evt.stopPropagation();
    }
  }, { once: true });
  el.typelessProperty = 'foo';
  assert(el.hasAttribute('typeless-property') === false);
  assert(errored === true);
});
