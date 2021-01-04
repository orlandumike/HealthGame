import React from "react";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { ApiData } from "types/api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: theme.spacing(2),
  },
  text: {
    fontSize: "1.1rem",
  },
}));

const UserInfo: React.FC<ApiData["user"]> = ({ avatarUrl, fullName }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt={fullName} src={avatarUrl} className={classes.avatar} />
    </div>
  );
};

export default UserInfo;
