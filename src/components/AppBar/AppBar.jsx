import { useRef, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { auth } from '#utils/firebase';
import { AddRecipeModal } from '#components/Recipes/Recipe/Add';
import { Stack } from '@mui/material';
import { useAuthContext } from '#utils/firebase/hooks';

export default function ResponsiveAppBar() {
  // State
  const { currentUser } = useAuthContext();
  const addRecipeRef = useRef({});
  const [anchorElUser, setAnchorElUser] = useState(null);

  // Callbacks
  const handleOpenUserMenu = event => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  console.log(currentUser);
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <LocalDiningIcon />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                My recipes
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Stack direction="row" spacing={2}>
                {!!currentUser?.photoURL && (
                  <Avatar
                    alt={currentUser.name ?? currentUser.displayName}
                    title={currentUser.name ?? currentUser.displayName}
                    src={currentUser.photoURL}
                  />
                )}
                {!currentUser?.photoURL && (
                  <Typography textAlign="center">
                    {currentUser.name ?? currentUser.displayName}
                  </Typography>
                )}
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <MenuIcon sx={{ color: 'white' }} />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    onClick={() => addRecipeRef.current.toggleShown(true)}
                  >
                    Add recipe
                  </Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={() => auth.signOut()}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AddRecipeModal ref={addRecipeRef} />
    </>
  );
}
