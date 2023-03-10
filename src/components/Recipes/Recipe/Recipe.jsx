import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { UpdateRecipe } from './Update';
import { DeleteRecipe } from './Delete';

export const Recipe = ({ recipe }) => {
  //local state
  const [expanded, setExpanded] = React.useState(false);
  const [editRecipeModal, setEditRecipeModal] = React.useState(false);
  const [deleteRecipeModal, setDeleteRecipeModal] = React.useState(false);

  //handlers
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //hooks
  const { pathname } = useLocation();

  const ExpandMore = styled(props => {
    // eslint-disable-next-line no-unused-vars
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  return (
    <>
      <Card>
        <CardHeader
          title={recipe?.title}
          action={
            pathname.includes('my-recipes') && (
              <>
                <Tooltip title="Edit recipe" arrow placement="top">
                  <IconButton
                    aria-label="settings"
                    onClick={() => setEditRecipeModal(true)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete recipe" arrow placement="top">
                  <IconButton
                    aria-label="settings"
                    onClick={() => setDeleteRecipeModal(true)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </>
            )
          }
        />
        <CardActions disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Description:</Typography>
            <Typography paragraph>{recipe?.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
      <UpdateRecipe
        open={editRecipeModal}
        setOpen={setEditRecipeModal}
        id={recipe.id}
      />
      <DeleteRecipe
        open={deleteRecipeModal}
        setOpen={setDeleteRecipeModal}
        id={recipe.id}
      />
    </>
  );
};
