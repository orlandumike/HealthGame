import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Toolbar } from "@material-ui/core";

import Routing from "./Routing";
import { ApiData } from "types/api";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

interface Props {
  data: ApiData;
}

const Content: React.FC<Props> = ({ data }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <Toolbar />
      <Routing data={data} />
    </main>
  );
};

export default Content;
