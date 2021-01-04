import React from "react";
import { Tooltip, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    border: `4px solid ${theme.palette.primary.main}`,
    borderRadius: "90%",
    width: 40,
    height: 40,
    display: "inline-flex",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    color: theme.palette.primary.main,
    cursor: "pointer",
  },
}));

interface Props {
  amount: number;
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}))(Tooltip);

const DiscountBadge: React.FC<Props> = ({ amount }) => {
  const classes = useStyles();

  return (
    <HtmlTooltip
      title={
        <Typography color="inherit">
          Votre niveau actuel vous donne un rabais de {amount}% sur votre prime
          LAMal
        </Typography>
      }
    >
      <div className={classes.root}>-{amount}%</div>
    </HtmlTooltip>
  );
};

export default DiscountBadge;
