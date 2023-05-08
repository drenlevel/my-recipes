// Libraries
import { useEffect, useRef } from 'react';

/** @type {HTMLElement=} */
export let portalElm;

export default function FixedElementsPortal() {
  // State
  /** @type {HTMLElementRef} */
  const portalRef = useRef({});

  // Effects
  useEffect(() => void (portalElm = portalRef.current), []);

  return <div ref={portalRef} data-fixed-elements-portal data-context />;
}
