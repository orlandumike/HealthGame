import React from "react";
import { AppBar as MUIAppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ApiData } from "types/api";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

interface Props {
  user: ApiData["user"];
}

const AppBar: React.FC<Props> = ({ user }) => {
  const classes = useStyles();

  return (
    <MUIAppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" noWrap>
          Activity Tracker
        </Typography>
        <Typography variant="h6" noWrap>
          {user.fullName}
        </Typography>
      </Toolbar>
    </MUIAppBar>
  );
};

export default AppBar;
