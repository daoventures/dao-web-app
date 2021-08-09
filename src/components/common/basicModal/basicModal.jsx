import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
    Dialog,
    DialogContent,
    IconButton,
    Typography,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
    dialogRoot: {
        border: "1px solid " + theme.themeColors.border,
        background: theme.themeColors.itemBack,
    },
    dialogTitle: {
        background: theme.themeColors.menuSel,
        borderColor: theme.themeColors.blockBorder,
        color: theme.themeColors.menuSelText,
        minHeight: "60px",
    },
    dialogContent: {
        background: theme.themeColors.itemBack,
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.themeColors.menuSelText,
    },
});

class BasicModal extends Component {
    constructor(props) {
        super();
    }

    render() {
        const { classes, content, title, setOpenModal, openModal } = this.props;

        const division = (<div></div>);

        return (
            <Dialog
                onClose={() => setOpenModal(false)}
                fullWidth={true}
                maxWidth={"sm"}
                classes={{ paper: classes.dialogRoot }}
                aria-labelledby="customized-dialog-title"
                open={openModal}
            >
                <MuiDialogTitle disableTypography className={classes.dialogTitle}>
                    <Typography variant="h6">{title ? title : ""}</Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => setOpenModal(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>
                <DialogContent dividers className={classes.dialogContent}>
                    {content ? content : division }
                </DialogContent>
            </Dialog>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(BasicModal)));