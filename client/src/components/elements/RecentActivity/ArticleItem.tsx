import clsx from "clsx";
import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  IconButton,
  Link,
  Typography,
} from "@material-ui/core";
import { Link as LinkIcon } from "@material-ui/icons";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import { Article } from "types/api";
import { descriptionExcerpt } from "utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  flexRow: {
    display: "flex",
  },
  content: {
    flex: "1 1 auto",
  },
  cover: {
    width: 80,
    height: 80,
  },
  coverWrapper: {
    padding: "5px 5px 5px 0",
    display: "flex",
    alignItems: "center",
  },

  media: {
    height: 300,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  link: {
    marginTop: 10,
    display: "flex",
    alignItems: "center",
    "& > *:last-child": {
      marginLeft: 10,
    },
  },
}));

interface Props extends Article {
  className: string;
}

const ArticleItem: React.FC<Props> = ({
  className,
  description,
  imageUrl,
  link,
  title,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const excerpt = descriptionExcerpt(description);
  const mustShowMore = excerpt.length < description.length;

  const handleExpandClick = (e: any) => {
    e.preventDefault();
    setExpanded(!expanded);
  };

  const handleLinkClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    window.open(link, "_blank");
  };

  return (
    <Card className={clsx(className, classes.root)}>
      <div className={classes.flexRow}>
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>
          <Typography variant="body2">{excerpt}</Typography>
          {link && (
            <Link href="#" onClick={handleLinkClick} className={classes.link}>
              <LinkIcon />
              <span>Suivre le lien</span>
            </Link>
          )}
        </CardContent>
        <div className={classes.coverWrapper}>
          <CardMedia
            className={classes.cover}
            image={imageUrl}
            title="badge-image"
          />
        </div>
        {mustShowMore && (
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
        )}
      </div>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ArticleItem;
