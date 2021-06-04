import React from "react";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { faTasks } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";

import Logo from "./Logo";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    fontSize: "24px",
    margin: "10px 0px 5px 0px",
    padding: "1px",
  },
  menuButton: {
    // margin: theme.spacing(1),
  },
  menuIcon: {
    color: "#555",
  },
  colorPrimary: {
    color: "#555",
    background: "yellow",
    fontWeight: "bold",
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
      <AppBar position="static" elevation={0} className={classes.colorPrimary}>
        <Toolbar variant="dense">
          <IconButton
            size="medium"
            aria-label="menuLogo"
            className={classes.menuButton}
            onClick={handleClick}
          >
            <MenuRoundedIcon className={classes.menuIcon} fontSize="large" />
          </IconButton>
          <Typography
            className={classes.colorPrimary}
            variant="h6"
            style={{ flex: 1 }}
          >
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
              <div style={{ marginLeft: "", marginRight: "2px" }}>{""}</div>
              <FontAwesomeIcon icon={faHome} className={classes.menuButton}/>
              <div style={{ marginLeft: "", marginRight: "8px" }}>{""}</div>
              Home
            </MenuItem>
            <MenuItem component={Link} to="/aglink" onClick={handleClose}>
              <div style={{ marginLeft: "", marginRight: "2px" }}>{""}</div>
              <FontAwesomeIcon icon={faPaperPlane} className={classes.menuButton}/>
              <div style={{ marginLeft: "", marginRight: "10px" }}>{""}</div>
              AG-Link
            </MenuItem>
            <MenuItem component={Link} to="/scanners" onClick={handleClose}>
              <div style={{ marginLeft: "", marginRight: "2px" }}>{""}</div>
              <FontAwesomeIcon icon={faBarcode} className={classes.menuButton}/>
              <div style={{ marginLeft: "", marginRight: "10px" }}>{""}</div>
              Scanners
            </MenuItem>
            <MenuItem component={Link} to="/bookmarks" onClick={handleClose}>
              <div style={{ marginLeft: "3.5px", marginRight: "2px" }}>
                {""}
              </div>
              <FontAwesomeIcon icon={faBookmark} className={classes.menuButton}/>
              <div style={{ marginLeft: "", marginRight: "11px" }}>{""}</div>
              Bookmarks
            </MenuItem>
            {/* <MenuItem component={Link} to="/blockade" onClick={handleClose}> */}
            {/*   <div style={{ marginLeft: "", marginRight: "2px" }}>{""}</div> */}
            {/*   <FontAwesomeIcon icon={faTasks} className={classes.menuButton}/> */}
            {/*   <div style={{ marginLeft: "", marginRight: "11px" }}>{""}</div> */}
            {/*   Blockade Checklist */}
            {/* </MenuItem> */}
            <MenuItem component={Link} to="/error" onClick={handleClose}>
              <div style={{ marginLeft: "2px", marginRight: "2px" }}>{""}</div>
              <FontAwesomeIcon icon={faExclamationTriangle} className={classes.menuButton}/>
              <div style={{ marginLeft: "", marginRight: "8px" }}>{""}</div>
              PLC Error Log
            </MenuItem>
            <MenuItem component={Link} to="/hex" onClick={handleClose}>
              <div style={{ marginLeft: "2px", marginRight: "2px" }}>{""}</div>
              <FontAwesomeIcon icon={faRetweet} className={classes.menuButton}/>
              <div style={{ marginLeft: "", marginRight: "7px" }}>{""}</div>
              Hex Parser
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
