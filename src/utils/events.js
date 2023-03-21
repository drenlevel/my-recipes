/**
 * Adds one or more event listeners to the given element and returns
 * a callback unregister (remove) function.
 * @param {HTMLElement | HTMLDocument | Window} elm
 * @param {Record<string, Function> | [string, Function]} options
 * @return {Function}
 */
export const registerDOMEvent = (elm, options) => {
  if (options?.constructor === Object) {
    const events = Object.entries(options).map(([event, handler]) =>
      registerDOMEvent(elm, [event, handler]),
    );

    return function unregisterAll() {
      events.forEach(unregister => unregister());
    };
  } else if (Array.isArray(options) && options?.length === 2) {
    const [event, handler] = options;

    elm.addEventListener(event, handler);

    return function unregister() {
      elm.removeEventListener(event, handler);
    };
  }
};
