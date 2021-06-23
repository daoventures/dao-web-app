import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import {
  CURRENT_THEME_RETURNED
} from '../../constants'
import ComingSoon from '../common/comingSoon/comingSoon';

import Store from "../../stores";
const emitter = Store.emitter
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
        return <ComingSoon></ComingSoon>
    }
}

export default withNamespaces()(withRouter(withStyles(styles)(Swap)));