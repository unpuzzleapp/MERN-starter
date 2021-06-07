/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import Notifications from '../common/component/Notification';
import PostPuzzlepiece from '../components/unpuzzle/postNew';
import MyButton from '../common/component/Button';
// Logo
import Logo from './Logo';

const styles = (theme) => ({
  ...theme.themeStyle,
  ...theme.typography,
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1.1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '1em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.25em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  headerLogo: {
    height: '6em',
    [theme.breakpoints.down('md')]: {
      height: '5em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '4.5em',
    },
  },
  tab: {
    ...theme.themeStyle.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
    color: 'black',
    opacity: 0.7,
  },
  button: {
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    fontSize: '1rem',
    textTransform: 'none',
    height: '45px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  appbar: {
    background: '#fefefe',
    zIndex: theme.zIndex.modal + 1,
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  menu: {
    backgroundColor: '#fefefe',
    borderRadius: '0',
  },
  menuItem: {
    ...theme.themeStyle.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: theme.palette.primary.main,
  },
  drawerItem: {
    ...theme.themeStyle.typography.tab,
    color: 'white',
    opacity: 0.7,
  },
  drawerItemSession: {
    backgroundColor: theme.palette.secondary.main,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
});

const Navbar = (props) => {
  const {
    classes,
    authenticated,
    value,
    selectedIndex,
    setValue,
    setSelectedIndex,
  } = props;
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const menuOptions = [
    { name: 'Tutoring', link: '/tutoring', activeIndex: 1, selectedIndex: 0 },
    {
      name: 'Grade 6 to Grade 12',
      link: '/gradeschool',
      activeIndex: 1,
      selectedIndex: 1,
    },
    {
      name: 'Computer Programming',
      link: '/computerprogramming',
      activeIndex: 1,
      selectedIndex: 2,
    },
    {
      name: 'Digita Skills',
      link: '/digitalskills',
      activeIndex: 1,
      selectedIndex: 3,
    },
  ];

  const guestRoutes = [
    { name: 'Home', link: '/', activeIndex: 0 },
    {
      name: 'Tutoring',
      link: '/tutoring',
      activeIndex: 1,
      mouseOver: (event) => handleClick(event),
      ariaOwns: anchorEl ? 'simple-menu' : undefined,
      ariaHasPopup: anchorEl ? true : undefined,
    },
    { name: 'Puzzle Tweet', link: '/puzzletweet', activeIndex: 2 },
    { name: 'Puzzle World', link: '/puzzleworld', activeIndex: 3 },
    {
      name: 'Innovation in Education',
      link: '/innovationineducation',
      activeIndex: 4,
    },
    { name: 'Login', link: '/login', activeIndex: 5 },
    { name: 'Signup', link: '/signup', activeIndex: 6 },
  ];

  useEffect(() => {
    [...menuOptions, ...guestRoutes].forEach((route) => {
      switch (window.location.pathname) {
        case `${route.link}`:
          if (value !== route.activeIndex) {
            setValue(route.activeIndex);
            if (route.selectedIndex && route.selectedIndex !== selectedIndex) {
              setSelectedIndex(route.selectedIndex);
            }
          }
          break;
        default:
          break;
      }
    });
  }, [value, menuOptions, selectedIndex, guestRoutes, props]);

  const guestUserTabs = (
    <Fragment key="guest-user-tab">
      <Tabs
        value={value}
        onChange={handleChange}
        className="tabContainer"
        indicatorColor="primary"
      >
        {guestRoutes.map((route, i) => (
          <Tab
            key={`${route}${i}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            onMouseOver={route.mouseOver}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaHasPopup}
          />
        ))}
      </Tabs>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        component={Link}
        to="/bookasession"
      >
        Book A Tutoring Session
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{ onMouseLeave: handleClose }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted
      >
        {menuOptions.map((option, i) => (
          <MenuItem
            key={`${option}${i}`}
            component={Link}
            to={option.link}
            classes={{ root: classes.menuItem }}
            onClick={(event) => {
              handleMenuItemClick(event, i);
              setValue(1);
              handleClose();
            }}
            selected={i === selectedIndex && value === 1}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );

  const guestUserDrawer = (
    <Fragment key="guest-user-drawer">
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List>
          {guestRoutes.map((route) => (
            <ListItem
              classes={{ selected: classes.drawerItemSelected }}
              key={`${route}${route.activeIndex}`}
              divider
              button
              component={Link}
              to={route.link}
              selected={value === route.activeIndex}
              onClick={() => {
                setOpenDrawer(false);
                setValue(route.activeIndex);
              }}
            >
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}
          <ListItem
            classes={{
              root: classes.drawerItemSession,
              selected: classes.drawerItemSelected,
            }}
            onClick={() => {
              setOpenDrawer(false);
              setValue(6);
            }}
            divider
            button
            component={Link}
            to="/bookasession"
            selected={value === 6}
          >
            <ListItemText className={classes.drawerItem} disableTypography>
              Book a Tutoring Session
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  );

  return (
    <Fragment key="navbar-page">
      <AppBar position="fixed" className={classes.appbar}>
        <Toolbar disableGutters className={classes.toolbar}>
          <Button
            component={Link}
            to="/"
            onClick={() => setValue(0)}
            className={classes.logoContainer}
            disableRipple
          >
            <Logo />
          </Button>
          {authenticated ? (
            <Fragment key="post-puzzle">
              <PostPuzzlepiece />
              <Link to="/">
                <MyButton tip="Home">
                  <HomeIcon />
                </MyButton>
              </Link>
              <Link to="/puzzletweet">
                <MyButton tip="Home">Puzzle Tweet</MyButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment key="conditional-routing">
              {matches ? guestUserDrawer : guestUserTabs}
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.login.isSuccess,
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
