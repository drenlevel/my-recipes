import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { auth } from '#utils/firebase';
import { Stack } from '@mui/material';
import { useAuthContext, useMediaQuery } from '#utils/hooks';

export default function MenuBar() {
  // State
  const { currentUser } = useAuthContext();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const isTabletOrWider = useMediaQuery('tablet');

  // Callbacks
  const handleOpenUserMenu = event => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);
  const appBarProps = {
    ...(isTabletOrWider && { position: 'static' }),
    ...(!isTabletOrWider && { component: 'nav' }),
  };

  return (
    <AppBar {...appBarProps}>
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
              href="/home"
              sx={{
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
            <Stack direction="row" sx={{ cursor: 'pointer' }}>
              {!!currentUser?.photoURL && (
                <Avatar
                  alt={currentUser.name ?? currentUser.displayName}
                  title={currentUser.name ?? currentUser.displayName}
                  src={currentUser.photoURL}
                  onClick={handleOpenUserMenu}
                />
              )}
              {!currentUser?.photoURL && (
                <Typography textAlign="center" onClick={handleOpenUserMenu}>
                  {currentUser.name ?? currentUser.displayName}
                </Typography>
              )}
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
                <Typography textAlign="center" onClick={() => auth.signOut()}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
