import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';

// Components
import { portalElm } from '#components/FixedElementsPortal';
import { RecipeImage } from '#components/RecipeImage/RecipeImage';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { CardActionArea, CardActions, Tooltip } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import { dialogs } from '#components/Dialogs';
import { useMediaQuery } from '#utils/hooks';

import styles from './styles.module.css';
import { toast } from 'react-hot-toast';

export const AddNewRecipeButton = () => {
  // State
  const isTabletOrWider = useMediaQuery('tablet');
  const iconButton = (
    <Tooltip title="Add new recipe" followCursor={isTabletOrWider}>
      <IconButton
        aria-label="add new recipe"
        color="primary"
        id="button-add"
        onClick={() => dialogs.recipe.add.show()}
      >
        <AddCircleIcon />
      </IconButton>
    </Tooltip>
  );

  // Effects
  useEffect(() => {
    portalElm.dataset.context = isTabletOrWider ? '' : 'button-add';
  }, [isTabletOrWider]);

  if (!isTabletOrWider) return createPortal(iconButton, portalElm);

  return (
    <Card raised>
      <CardContent className={styles['recipeCard--addNew']}>
        {iconButton}
      </CardContent>
    </Card>
  );
};

export const Recipe = ({ recipe, idx }) => {
  // Callback
  const navigate = useNavigate();

  return (
    <Card raised>
      <CardContent className={styles['recipeCard--content']}>
        <CardHeader title={recipe?.title} />
        <Tooltip title="Click to view more info" arrow placement="bottom-start">
          <CardActionArea
            className={styles.recipeCard}
            // onClick={() => dialogs.recipe.view.show(recipe)}
            onClick={() => navigate(`/home?recipe=${recipe.id}`)}
          >
            <CardContent
              sx={{
                display: 'flex',
                placeItems: 'baseline',
                height: '100%',
                padding: '0',
              }}
            >
              {recipe?.image && (
                <RecipeImage
                  idx={idx}
                  imageRef={recipe?.image}
                  style={{ width: '100%' }}
                />
              )}
            </CardContent>
          </CardActionArea>
        </Tooltip>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Tooltip title="Share" arrow placement="top">
            <IconButton
              aria-label="share recipe"
              onClick={() => {
                const searchParamsObj = new URLSearchParams({
                  recipe: recipe.id,
                });
                const recipeSearchSegment = `?${searchParamsObj.toString()}`;
                const { origin, pathname } = window.location;
                const recipeFullUrl = [
                  origin,
                  pathname,
                  recipeSearchSegment,
                ].join('');

                navigator.clipboard.writeText(recipeFullUrl).then(
                  () => {
                    toast.success(`Recipe URL copied!\n\n${recipeFullUrl}`, {
                      duration: 1000,
                    });
                  },
                  () => {
                    toast.error('Failed to copy the recipe URL!');
                  },
                );
              }}
            >
              <ShareOutlinedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" arrow placement="top">
            <IconButton
              aria-label="edit recipe"
              onClick={() => dialogs.recipe.edit.show(recipe)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow placement="top">
            <IconButton
              aria-label="delete recipe"
              onClick={() => dialogs.recipe.delete.show(recipe)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </CardContent>
    </Card>
  );
};
