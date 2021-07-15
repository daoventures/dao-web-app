import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import {
    Avatar,
    Dialog,
    DialogContent,
    IconButton,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";

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
    currencyBlock: {
        position: "relative",
    },
    currencyInfo: {
        marginTop: "10px",
        width: "100%",
        height: "30px",
        color: theme.themeColors.textT,
        background: theme.themeColors.blockBack,
        borderColor: theme.themeColors.blockBorder,
        borderWidth: "1px",
        borderStyle: "solid",
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        padding: "0px 10px",
        cursor: "pointer",
    },
    assetIconImg: {
        width: "20px",
        height: "20px",
        marginRight: "5px",
    },
    arrowDropdownIcon: {
        height: "15px",
        fill: theme.themeColors.textP,
    },
    modalListItem: {
        border: "1px solid " + theme.themeColors.border,
        marginTop: "10px",
        color: theme.themeColors.textT,
        "&:active": {
            background: theme.themeColors.buttonActive,
        },
    },
});

class CurrencyToggle extends Component {
    constructor(props) {
        super();
        this.state = {
            displayModal: false,
            selectedIndex: 0
        }
    }

    handleModalDisplay = (displayModal) => {
        this.setState({displayModal});
    } 

    handleSelectedCurrency = (index) => {
        this.setState({selectedIndex: index})
        this.props.selectedCurrency(index);
        this.handleModalDisplay(false);
    }

    renderModal = () => {
        const { classes, currencies} = this.props;
        const { displayModal } = this.state;
       
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
                    <Typography variant="h6">Select a Currency</Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.closeButton}
                        onClick={() => this.handleModalDisplay(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </MuiDialogTitle>
                <DialogContent dividers className={classes.dialogContent}>
                    <List component="nav" aria-label="main mailbox folders">
                        {currencies.length > 0 &&
                            currencies.map((currency, index) => {
                                return (
                                    <ListItem
                                        button
                                        onClick={() => this.handleSelectedCurrency(index)}
                                        className={classes.modalListItem}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                alt=""
                                                src={require("../../../../assets/" + currency + "-logo.png")}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText primary={currency} />
                                    </ListItem>
                                );
                            })}
                    </List>
                </DialogContent>
            </Dialog>
        );
    }

    render() {
        const { classes, currencies} = this.props;
        const { selectedIndex } = this.state;
        
        if(!currencies || currencies.length <= 0) {
            return null;
        }
        
        return (
            <React.Fragment>
                {this.renderModal()}
                <div className={classes.currencyBlock}>
                    <div
                        className={classes.currencyInfo}
                        onClick={() => {
                            this.handleModalDisplay(true);
                        }}
                    >
                        <img
                            alt=""
                            src={require("../../../../assets/" +
                            currencies[selectedIndex] +
                                "-logo.png")}
                            className={classes.assetIconImg}
                        />
                        <span>
                            {currencies[selectedIndex]}
                        </span>
                        <ArrowDropDownCircleIcon
                            className={classes.arrowDropdownIcon}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(CurrencyToggle)));