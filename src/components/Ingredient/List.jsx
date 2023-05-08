import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import IngredientValue from './Value';

export default function IngredientsList({ data = [], onRemove, ...props }) {
  if (!data?.length) return;

  return (
    <ul className="ingredientList">
      {data?.map(({ label, value, unit, id }, i) => (
        <li key={`ingredient-${i + 1}`} data-ingredient-id={id}>
          <div className="ingredientValueContainer">
            <b>{label} </b>
            <div style={{ position: 'relative' }}>
              <i>
                (<IngredientValue {...props} value={value} /> {unit})
              </i>
              {props.editableValue && (
                <IconButton
                  role="remove"
                  title="Remove ingredient"
                  onClick={() => onRemove(id)}
                >
                  <ClearIcon color="error" />
                </IconButton>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
