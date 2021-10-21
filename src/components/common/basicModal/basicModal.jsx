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
    title: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "18px"
    },
    subTitle: {
        fontFamily: "Rubik",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "18px"
    }
});

class BasicModal extends Component {
    constructor(props) {
        super();
    }

    closeModal = (event, reason) => {
        if (reason !== 'backdropClick') {
            this.props.setOpenModal(false);
        }
    }

    render() {
        const { classes, contentTemplate, title, subTitle, setOpenModal, openModal, titleTemplate } = this.props;
        const division = (<div></div>);

        return (
            <Dialog
                onClose={this.closeModal}
                fullWidth={true}
                maxWidth={"sm"}
                classes={{ paper: classes.dialogRoot }}
                aria-labelledby="customized-dialog-title"
                open={openModal}
            >
                <MuiDialogTitle disableTypography className={classes.dialogTitle}>
                    {titleTemplate !== undefined && titleTemplate}
                    {(titleTemplate === undefined) && title && <Typography variant="h6" className={classes.title}>{title ? title : ""}</Typography>}
                    {(titleTemplate === undefined) && subTitle && <Typography className={classes.subTitle} variant="h6">{subTitle}</Typography>}
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => setOpenModal(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>
                <DialogContent dividers className={classes.dialogContent}>
                    {contentTemplate ? contentTemplate : division }
                </DialogContent>
            </Dialog>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(BasicModal)));