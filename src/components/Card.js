import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Icon } from "@material-ui/core";
import PropTypes from "prop-types";
import Paper from "@material-ui/core/Paper";
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
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
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
  to: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "5vw",
    width: 300,
    height: 300,
    fontSize: "24px",
  },
});

export default function ListRouter(props) {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "wrap" }}>
      <Paper elevation={2} style={{ flex: "1" }} className={classes.root}>
        <ListItemLink
          to={props.to}
          primary={props.primary}
          icon={props.icon}
        />
      </Paper>
      {/*
      <Paper elevation={2} style={{ flex: "1" }} className={classes.root}>
        <ListItemLink
          to="/OVERHEAD"
          primary="Overhead Scanner Data"
          icon={<ScannerTwoToneIcon style={{ fontSize: "38px" }} />}
        />
      </Paper>
      <Paper elevation={2} style={{ flex: "1" }} className={classes.root}>
        <ListItemLink
          to="/ERROR"
          primary="Error Log"
          icon={<ErrorTwoToneIcon style={{ fontSize: "38px" }} />}
        />
      </Paper>
      <Paper elevation={2} style={{ flex: "1" }} className={classes.root}>
        <ListItemLink
          to="/TT31"
          primary="TT31 Data"
          icon={<EmailTwoToneIcon style={{ fontSize: "38px" }}/>}
        />
      </Paper>
      */}
    </div>
  );
}
