/** @format */

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import cookies from "../helpers/cookies";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "30ch",
        backgroundColor: "alpha(theme.palette.common.white, 0.55)",
      },
    },
  },
}));

const settings = ["Profile", "Logout"];

function NavBar() {
  const [loggedIn, setLoggedIn] = useState(false);


  const [anchorElNav, setAnchorElNav] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<HTMLElement | null>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = cookies.doesExist("username") === true;
      setLoggedIn(isLoggedIn);
    };

  checkLoginStatus();

}, [location]);

  
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <SchoolRoundedIcon sx={{ mr: 1 }} />
          <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              variant='h6'
              noWrap
              component='a'
              sx={{
                mr: 2,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}>
              LibreLearn
            </Typography>
          </Link>

          {!location.pathname.startsWith("/search") && (
          <Search sx={{ background: "center" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  const inputValue = (event.target as HTMLInputElement).value;
                  navigate("/search/" + inputValue);
                  (event.target as HTMLInputElement).value = '';
                }
              }}
            />
          </Search>
          )}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-end",
              pr: 5,
            }}>
              {loggedIn ? (
                <>
                <Link to='/cardmake' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  key='Create Cards'
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block", px: 2 }}>
                  Create Cards
                </Button>
              </Link>
              <Link to='/assistant' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  key='Assistant'
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block", px: 2 }}>
                  Virtual Assistant
                </Button>
              </Link>
              </>
              )
              : (
                <>
                <Link to='/signup' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  key='Sign up'
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block", px: 3 }}>
                  Sign up
                </Button>
                </Link>
                <Link to='/login' style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                  key='Log In'
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block", px: 3 }}>
                  Log In
                </Button>
                </Link>
                </>
              )}
          </Box>
          
          {loggedIn && 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ color: "white", fontSize: 35 }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Link to={`/${setting}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography textAlign='center'>{setting}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}


export default NavBar;
