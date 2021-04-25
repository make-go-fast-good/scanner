import React from "react";
import { Link } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import BookmarksTwoToneIcon from "@material-ui/icons/BookmarksTwoTone";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import ScannerTwoToneIcon from "@material-ui/icons/ScannerTwoTone";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import FindInPageTwoToneIcon from "@material-ui/icons/FindInPageTwoTone";

import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontSize: "24px",
    margin: "10px 0px 5px 0px",
    padding: "1px",
  },
  menuButton: {
    marginRight: theme.spacing(4),
  },
  colorInherit: {
    color: "black",
    background: "yellow",
  },
  colorIcon: {
    color: "rgba(0,0,0,0.8)",
    // background: "#A8A8A8",
    // padding: "2px",
    // width: "1.25em",
    //   borderRadius: "4px"
  },
  colorPrimary: {
    color: "black",
  },
}));

export default function DenseAppBar(props) {
  const classes = useStyles(props);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="inherit"
        elevation={0}
        className={classes.colorInherit}
      >
        <Toolbar variant="dense">
          <IconButton
            size="medium"
            aria-label="menuLogo"
            className={classes.menuButton}
            onClick={handleClick}
          >
            <MenuRoundedIcon fontSize="large" className={classes.colorIcon} />
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
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <MenuItem component={Link} to="/" onClick={handleClose}>
              <HomeTwoToneIcon className={classes.menuButton} />
              Home
            </MenuItem>
            <MenuItem component={Link} to="/aglink" onClick={handleClose}>
              <EmailTwoToneIcon className={classes.menuButton} />
              AG-Link
            </MenuItem>
            <MenuItem component={Link} to="/scanners" onClick={handleClose}>
              <ScannerTwoToneIcon className={classes.menuButton} />
              Scanners
            </MenuItem>
            <MenuItem component={Link} to="/bookmarks" onClick={handleClose}>
              <BookmarksTwoToneIcon className={classes.menuButton} /> Bookmarks
            </MenuItem>
            <MenuItem component={Link} to="/blockade" onClick={handleClose}>
              <CheckCircleTwoToneIcon className={classes.menuButton} /> Blockade
              Checklist
            </MenuItem>
            <MenuItem component={Link} to="/error" onClick={handleClose}>
              <ErrorTwoToneIcon className={classes.menuButton} /> PLC Error Log
            </MenuItem>
            <MenuItem component={Link} to="/hex" onClick={handleClose}>
              <FindInPageTwoToneIcon className={classes.menuButton} />
              Hex Parser
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
