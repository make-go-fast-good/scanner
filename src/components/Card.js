import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EmailIcon from "@material-ui/icons/Email";
import EmailTwoToneIcon from "@material-ui/icons/EmailTwoTone";
import { Icon, CardHeader } from "@material-ui/core";

import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Paper from "@material-ui/core/Paper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import { Route, MemoryRouter } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import Box from "@material-ui/core/Box";

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <Card button component={renderLink}>
      <CardContent>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-around"}
          textAlign={"center"}
          minHeight={250}
        >
            {primary}
            {icon ? <Icon fontSize={"large"}>{icon}</Icon> : null}
        </Box>
      </CardContent>
    </Card>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
};

const useStyles = makeStyles({
  root: {
    flexDirection: "row",
    justifyContent: "center",
    margin: "100px",
    width: 300,
    height: 300,
    fontSize: "24px"
  }
});

export default function ListRouter() {
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <Paper elevation={2} style={{ flex: "1" }} className={classes.root}>
        <ListItemLink
          to="/TT13"
          primary="TT13 Data"
          icon={<EmailTwoToneIcon style={{ fontSize: "38px" }}/>}
        />
      </Paper>
      <Paper elevation={2} style={{ flex: "1" }} className={classes.root}>
        <ListItemLink
          to="/TT19"
          primary="TT19 Data"
          icon={<EmailTwoToneIcon style={{ fontSize: "38px" }}/>}
        />
      </Paper>
      <Paper elevation={2} style={{ flex: "1" }} className={classes.root}>
        <ListItemLink
          to="/TT31"
          primary="TT31 Data"
          icon={<EmailTwoToneIcon style={{ fontSize: "38px" }}/>}
        />
      </Paper>
    </div>
  );
}
