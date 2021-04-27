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
import BookmarksTwoToneIcon from "@material-ui/icons/BookmarksTwoTone";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import ErrorTwoToneIcon from "@material-ui/icons/ErrorTwoTone";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import ScannerTwoToneIcon from "@material-ui/icons/ScannerTwoTone";
import CheckCircleTwoToneIcon from "@material-ui/icons/CheckCircleTwoTone";
import FindInPageTwoToneIcon from "@material-ui/icons/FindInPageTwoTone";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  menuIcon: {
    color: "#555",
    // background: "#555",
    // background: "white",
    // borderRadius: ".15em",
    //   width: "1.25em"
  },
  colorPrimary: {
    color: "#555",
    // color: "black",
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
            <MenuItem component={Link} to="/" onClick={handleClose}style={{marginRight: ""}}>
              {/* <HomeTwoToneIcon className={classes.menuButton} /> */}
              <FontAwesomeIcon icon={faHome} className={classes.menuButton} />
              Home
            </MenuItem>
            <MenuItem component={Link} to="/aglink" onClick={handleClose} style={{marginRight: ""}}>
              {/* <EmailTwoToneIcon className={classes.menuButton} /> */}
              <FontAwesomeIcon icon={faPaperPlane} className={classes.menuButton} />
              AG-Link
            </MenuItem>
            <MenuItem component={Link} to="/scanners" onClick={handleClose}style={{marginRight: ""}}>
              {/* <ScannerTwoToneIcon className={classes.menuButton} /> */}
              <FontAwesomeIcon icon={faBarcode} className={classes.menuButton} />
              Scanners
            </MenuItem>
            <MenuItem component={Link} to="/bookmarks" onClick={handleClose}style={{marginRight: ""}}>
              {/* <BookmarksTwoToneIcon className={classes.menuButton} /> Bookmarks */}
               <FontAwesomeIcon icon={faBookmark} className={classes.menuButton} /> Bookmarks
            </MenuItem>
            <MenuItem component={Link} to="/blockade" onClick={handleClose}style={{marginRight: ""}}>
              {/* <CheckCircleTwoToneIcon className={classes.menuButton} /> Blockade */}
              {/* Checklist */}
               <FontAwesomeIcon icon={faTasks} className={classes.menuButton} />Blockade
              Checklist
            </MenuItem>
            <MenuItem component={Link} to="/error" onClick={handleClose}style={{marginRight: ""}}>
              {/* <ErrorTwoToneIcon className={classes.menuButton} /> PLC Error Log */}
               <FontAwesomeIcon icon={faExclamationTriangle} className={classes.menuButton} />PLC Error Log
            </MenuItem>
            <MenuItem component={Link} to="/hex" onClick={handleClose}style={{marginRight: ""}}>
              {/* <FindInPageTwoToneIcon className={classes.menuButton} /> */}
               <FontAwesomeIcon icon={faRetweet} className={classes.menuButton} />
              Hex Parser
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
