import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Logo from './Logo';

import { Link } from "react-router-dom";
<<<<<<< HEAD
=======
import { Icon } from "@material-ui/core";
>>>>>>> 613c03281adab54035697c43632cd90c1339526f
import { makeStyles } from '@material-ui/core/styles';

import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import ScannerTwoToneIcon from '@material-ui/icons/ScannerTwoTone';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
	fontSize: '20px',
	margin: '10px 0px 5px 0px',
<<<<<<< HEAD
    padding: '1px',
  },
  menuButton: {
    marginRight: theme.spacing(3),
=======
    padding: '1px'
  },
  menuButton: {
    marginRight: theme.spacing(2),

>>>>>>> 613c03281adab54035697c43632cd90c1339526f
  },
  colorInherit: {
      color: 'black',
      background: 'yellow'
  },
 colorPrimary: {
      color: 'black'
  },
}));

export default function DenseAppBar(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

<<<<<<< HEAD
  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" elevation={0} className={classes.colorInherit}>
=======

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit" className={classes.colorInherit}>
>>>>>>> 613c03281adab54035697c43632cd90c1339526f
        <Toolbar variant="dense" >
          <IconButton
              edge="start"
              size="medium"
              aria-label="menuLogo"
<<<<<<< HEAD
=======
              className={classes.menuButton}
>>>>>>> 613c03281adab54035697c43632cd90c1339526f
              className={classes.colorPrimary}
              onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" style={{ flex: 1 }}>
              {props.title}
          </Typography>
          <Logo />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem component={Link} to="/" onClick={handleClose}><HomeTwoToneIcon className={classes.menuButton}/>Home</MenuItem>
        <MenuItem component={Link} to="/TT13" onClick={handleClose}><EmailTwoToneIcon className={classes.menuButton}/>TT13 Data</MenuItem>
          <MenuItem component={Link} to="/OVERHEAD" onClick={handleClose}><ScannerTwoToneIcon className={classes.menuButton}/> Overhead Scanner</MenuItem>
          <MenuItem component={Link} to="/ERROR"onClick={handleClose}><ErrorTwoToneIcon className={classes.menuButton}/> Error Log</MenuItem>
      </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
