import React from "react";
import {
  Link,
  LinkProps as RouterLinkProps,
  useLocation,
} from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
      "& $iconActive": {
        color: "white",
      },
    },
  },
  inactive: {
    backgroundColor: "white",
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      color: "white",
      "& $iconInactive": {
        color: "white",
      },
    },
  },
  iconActive: {
    color: "white",
  },
  iconInactive: {
    color: theme.palette.primary.main,
  },
}));

interface Props {
  icon?: any;
  text: string;
  to: string;
}

const ListItemLink: React.FC<Props> = ({ icon, text, to }) => {
  const classes = useStyles();
  const location = useLocation();

  const urlMatches = location.pathname === to;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  );

  return (
    <ListItem
      button
      className={urlMatches ? classes.active : classes.inactive}
      component={CustomLink}
    >
      {icon ? (
        <ListItemIcon
          className={urlMatches ? classes.iconActive : classes.iconInactive}
        >
          {icon}
        </ListItemIcon>
      ) : null}
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default ListItemLink;
