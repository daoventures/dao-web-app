import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
  CURRENT_THEME_RETURNED
} from '../../constants'

import Store from "../../stores";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store


const styles = theme => ({
    root: {
        flex: 1,
        width: '100%',
        paddingLeft: '320px',
        paddingRight: '80px',
        paddingTop: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0px',
            paddingRight: '0px'
        }
    },
    comingSoon: {
        textAlign: 'center',
        '& img': {
            width: '100px'
        },
        '& p': {
            fontSize: '30px',
            color: theme.themeColors.textT
        },
        [theme.breakpoints.down('sm')]: {
            '& img': {
                width: '60px'
            },
            '& p': {
                fontSize: '20px',
            },
        }
    }
});


class Swap extends Component {
    constructor(props) {
        super()
         this.state = {
            currentTheme: store.getStore('currentTheme'),
        }
    }

    componentWillMount() {
        emitter.on(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    }

    componentWillUnmount() {
        emitter.removeListener(CURRENT_THEME_RETURNED, this.currentThemeChanged);
    }

    currentThemeChanged = () => {
        this.setState({currentTheme: store.getStore('currentTheme')})
    }

    render() {
        const { classes } = this.props;
        return <div className={ classes.root }>
            <div className={ classes.comingSoon }>
                <img src={this.state.currentTheme === 'light' ? require("../../assets/img_new/comingsoon_light@2x.png") : require("../../assets/img_new/comingsoon_dark@2x.png")}/>
                <p>Coming Soon</p>
            </div>
        </div>
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(Swap)));