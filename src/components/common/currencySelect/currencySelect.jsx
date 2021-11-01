import React, { Component }  from 'react';
import { withStyles } from "@material-ui/styles"
import ArrowDropDownCircleIcon from "@material-ui/icons/ArrowDropDownCircle";
import { withRouter } from 'react-router';
import BasicModal from '../basicModal/basicModal';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from "@material-ui/core";
import Store from "../../../stores/storev2";

const emitter = Store.emitter;

const styles = (theme) => ({
    currencyButton: {
        marginTop: "-12px",
        marginRight: "-8px",
        width: "100%",
        height: "30px",
        color: theme.themeColors.textT,
        background: theme.themeColors.blockBack,
        fontSize: "14px",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
    },
    currencyIcon: {
        width: "20px",
        height: "20px",
        marginRight: "5px",
    },
    dropDownIcon: {
        height: "15px",
        fill: theme.themeColors.textP
    },
    currencyContainer: {
        display: "flex",
        flexDirection: "column"
    },
    currencyItem: {
        border: `1px solid ${theme.themeColors.border}`,
        marginTop: "10px",
        color: theme.themeColors.textT,
        "&:active": {
            background: theme.themeColors.buttonActive,
        },
        display: "flex",
        alignItems: "center"
    }
})

class CurrencySelect extends Component {
    constructor() {
        super();
        this.state = {
            isModalOpen: false,
            selectedCurrency: 0,
            selectedTokenIndex: 0,
            url: "" ,
            refresh: null
        }
    }

    componentDidUpdate(prevProps) {
        if(prevProps.refresh !== this.props.refresh) {
            // To reset back selected currency to first item of currencies after deposit / withdraw
            this.setState({selectedCurrency: 0});
        }
    }

    handleOpenModal = (open = false) => {
        this.setState({isModalOpen: open});
    }
    
    handleSelectedCurrency = (index) => {
        const { currencies } = this.props;
        const selectedCurrency = currencies.find((c, cIndex) => cIndex === index);
        this.props.selectedCurrency(selectedCurrency);
        this.setState({selectedCurrency: index});
        this.handleOpenModal(false);
    }

    renderCurrencyModal = () => {
        const { classes, currencies } = this.props;
        const { isModalOpen } = this.state;
        
        const titleTemplate = <Typography variant={"h3"}>Select a currency</Typography>

        const contentTemplate = (
            <List component="nav" aria-label="main mailbox folders">
                {currencies.length > 0 &&
                currencies.map((currency, index) => {
                    const label = currency.label;
                    return (
                        <ListItem
                            button
                            onClick={() => this.handleSelectedCurrency(index)}
                            key={index}
                            className={classes.currencyItem}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    alt=""
                                    src={require("../../../assets/" + label + "-logo.png")}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={label} />
                        </ListItem>
                    );
                })}
            </List>
        );

        return <BasicModal contentTemplate={contentTemplate} 
                    titleTemplate={titleTemplate}
                    setOpenModal={this.handleOpenModal}
                    openModal={isModalOpen} />
    }

    render() {
        const { classes, currencies } = this.props;
        const { selectedCurrency } = this.state;
        if(currencies === undefined || currencies.length <= 0) {
            return null;
        }

        const chosenCurrency = currencies.find((c, index) => index === selectedCurrency);
        const label = chosenCurrency["label"];
       
        const url = require(`../../../assets/${label}-logo.png`);

        const contentTemplate = (
            <div 
                className={classes.currencyButton}
                onClick={() => { this.handleOpenModal(true)} }
            >
                <img
                    alt=""
                    src={url}
                    className={classes.currencyIcon}
                />
                <span className={classes.addressSpan}>
                    {label}
                </span>
                <ArrowDropDownCircleIcon className={classes.dropDownIcon}/>
            </div>
        );

        return <React.Fragment>
            {contentTemplate}
            {this.renderCurrencyModal()}
        </React.Fragment>;
    }
}

export default withRouter(withStyles(styles, {withTheme: true})(CurrencySelect));