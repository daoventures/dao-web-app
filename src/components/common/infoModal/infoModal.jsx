import React, { Component } from "react";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import BasicModal from "../basicModal/basicModal";

const styles = (theme) => ({
    infoLink: {
        width: '14px',
        height: '14px',
        fill: theme.themeColors.iconGray,
        marginLeft: '5px'
    },
    infoLinkLarge: {
        width: "20px",
        height: "20px",
        fill: theme.themeColors.iconGray,
        marginLeft: "8px",
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
        const { content, title } = this.props;
        const { displayModal } = this.state;

        return <BasicModal content={content} title={title} openModal={displayModal} setOpenModal={this.handleModalDisplay}></BasicModal>
    }

    render() {
        const { classes, size } = this.props;
        const iconSize = (size !== "" &&  size !== undefined) ? size : "";
    
        return (
            <React.Fragment>
                {this.renderModal()}
                <svg aria-hidden="true" className={classes[`infoLink${iconSize}`]} onClick={() => this.handleModalDisplay(true)}>
                    <use xlinkHref="#iconinformation-day"></use>
                </svg>
            </React.Fragment>
        );
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(InfoModal)));