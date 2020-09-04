import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '50%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    zIndex: 100000,
    position: 'fixed',
    top: '12vh',
    right: '4vw',
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
