import React from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";

import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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
          color={"#555"}
        >
          {primary}
          {icon ? <>{icon}</> : null}
        </Box>
      </CardContent>
    </Card>
  );
}

const useStyles = makeStyles({
  root: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    margin: "1.5vw 5vw",
    width: 275,
    height: 275,
    fontSize: "24px",
  },
});

export default function ListRouter(props) {
  const classes = useStyles();

  return (
    <div style={{ display: "flex", flexDirection: "wrap" }}>
      <Paper elevation={2} style={{ flex: "1" }} className={classes.root}>
        <ListItemLink to={props.to} primary={props.primary} icon={props.icon} />
      </Paper>
    </div>
  );
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
