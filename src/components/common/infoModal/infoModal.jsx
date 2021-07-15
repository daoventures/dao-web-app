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
    infoLink: {
        width: '14px',
        height: '14px',
        fill: theme.themeColors.textT,
        marginLeft: '5px'
    },
});

class InfoModal extends Component {
    constructor(props) {
        super();
        this.state = {
            displayModal: false
        }
    }

    handleModalDisplay = (displayModal) => {
        this.setState({displayModal});
    }

    renderModal = () => {
        const { classes, content, title } = this.props;
        const { displayModal } = this.state;

        const division = (<div></div>);
       
        return (
            <Dialog
                onClose={() => this.handleModalDisplay(false)}
                fullWidth={true}
                maxWidth={"sm"}
                classes={{ paper: classes.dialogRoot }}
                aria-labelledby="customized-dialog-title"
                open={displayModal}
            >
                <MuiDialogTitle disableTypography className={classes.dialogTitle}>
                    <Typography variant="h6">{title ? title : ""}</Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => this.handleModalDisplay(false)}
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

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                {this.renderModal()}
                <svg aria-hidden="true" className={classes.infoLink} aria-hidden="true" onClick={() => this.handleModalDisplay(true)}>
                    <use xlinkHref="#iconinformation-day"></use>
                </svg>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(InfoModal)));