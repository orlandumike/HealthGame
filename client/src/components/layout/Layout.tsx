import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "./AppBar";
import Content from "./Content";
import { ApiData } from "types/api";

const useStyles = makeStyles({
  root: {
    display: "flex",
  },
});

interface Props {
  data: ApiData;
}

const Layout: React.FC<Props> = ({ data }) => {
  // Hooks.
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar user={data.user} />
      <Content data={data} />
    </div>
  );
};

export default Layout;
