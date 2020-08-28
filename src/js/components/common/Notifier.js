import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '50%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    zIndex: 100000,
    position: 'fixed',
    top: '10vh',
    right: '5vw',
  },
}));

export default function SimpleAlerts(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity={props.case}>{props.message}</Alert>
    </div>
  );
}
