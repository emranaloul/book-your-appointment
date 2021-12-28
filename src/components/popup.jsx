import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { If, Then } from "react-if";

const Popup = (props) => {
  const [open, setOpen] = React.useState(true);
  let x = open && props.show;
//   const handleClickOpen = () => {
//     setOpen(true);
//   };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const handleClose = () => {
    // props.setError(null);
    setOpen(false);
  };

  return (
    <div>
      <If condition={x}>
        <Then>
          <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {props.title}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {props.message}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                okay
              </Button>
            </DialogActions>
          </Dialog>
        </Then>
      </If>
    </div>
  );
};

export default Popup;
