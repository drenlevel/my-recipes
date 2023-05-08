// Libraries
import { useEffect, useRef } from 'react';

// Helpers
import { registerDOMEvent } from '#utils/events';

// Constants
import { MAX_INPUT_VALUE } from '#constants/values';

export default function IngredientValue({
  value,
  editableValue,
  onEdit,
  ...props
}) {
  // State
  /** @type {{current?: HTMLSpanElement}} */
  const valueRef = useRef({});

  // Effects
  useEffect(() => {
    const valueElm = valueRef.current;

    if (!editableValue || !valueElm.isConnected) return;

    const onDoubleClick = () => {
      valueRef.current.contentEditable = true;
      valueRef.current.focus();
    };
    const onFocus = () => {
      const selection = window.getSelection();

      if (selection.isCollapsed) return;

      const range = selection.getRangeAt(0);

      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    };
    const onBlur = ({ target }) => void (target.contentEditable = false);
    const onKeyDown = event => {
      const preventDefaults = () => {
        event.preventDefault();
        event.stopPropagation();
      };

      const { ingredientId } = event.target.closest('li').dataset;
      const valueAsInt = (() => {
        const oldVal = event.target.textContent;
        const { anchorOffset: start, focusOffset: end } = getSelection();
        const newVal =
          start === end
            ? oldVal + event.key
            : oldVal.substring(0, start) + event.key + oldVal.substring(end);

        return parseInt(newVal, 10);
      })();

      const navAndExecutionKeysRegex =
        /(enter|escape|tab|backspace|delete|home|end|left|right|up|down)/i;
      const textActions = event.ctrlKey && /a|z|c|v|x/i.test(event.key);
      const execActions = navAndExecutionKeysRegex.test(event.key);
      const navActions =
        event.ctrlKey && navAndExecutionKeysRegex.test(event.key);
      const shouldNotAllowAndExit =
        !textActions && !navActions && !execActions && !/\d/.test(event.key);

      if (shouldNotAllowAndExit || valueAsInt > MAX_INPUT_VALUE) {
        return preventDefaults();
      }

      if (/(up|down)/i.test(event.key)) {
        preventDefaults();

        const spunValue = valueAsInt + (/up/i.test(event.key) ? +1 : -1);

        if (spunValue > MAX_INPUT_VALUE) return;

        onEdit(ingredientId, spunValue);

        return;
      }

      if (/enter|escape/i.test(event.key)) {
        valueRef.current.contentEditable = false;
        preventDefaults();

        if (event.key === 'Enter') {
          onEdit(ingredientId, valueAsInt);
        } else if (event.key === 'Escape') {
          event.target.textContent = value;
        }
      } else if (event.key === 'Tab') {
        event.target.textContent = value;
      }
    };
    const { onTouchStart, onTouchEnd } = (pressTimer => ({
      onTouchStart: () => void (pressTimer = setTimeout(onDoubleClick, 500)),
      onTouchEnd: () => clearTimeout(pressTimer),
    }))();

    return registerDOMEvent(valueElm, {
      dblclick: onDoubleClick,
      focus: onFocus,
      blur: onBlur,
      keydown: onKeyDown,
      touchstart: onTouchStart,
      touchend: onTouchEnd,
    });
  }, [value, editableValue, onEdit]);

  return (
    <span
      ref={valueRef}
      title="Double click to edit the value"
      className="ingredientValue"
      {...props}
    >
      {value}
    </span>
  );
}
