import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from "react-router-dom"

import {
    CURRENT_THEME_RETURNED,
    TOGGLE_THEME
} from '../../constants'

import Store from "../../stores/storev2"
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

const styles = theme => ({
    toggleThemeImg: {
        height: '26px',
        cursor: 'pointer'
    },
});

class ToggleTheme extends Component {
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
        return <div className="toggle-theme" onClick={this.toggleTheme}>
            {
                this.state.currentTheme === 'light' ?
                <img className={classes.toggleThemeImg} src={require('../../assets/img_new/btn_dayMode@2x.png')}/>:
                <img className={classes.toggleThemeImg} src={require('../../assets/img_new/btn_NightMode@2x.png')}/>
            }
        </div>
    }

    toggleTheme = () => {
        const currentTheme = this.state.currentTheme === 'light' ? 'dark' : 'light'
        dispatcher.dispatch({ type: TOGGLE_THEME, content: { currentTheme: currentTheme} })
        localStorage.setItem('daobenturesTheme', currentTheme);
    }
}

export default withRouter(withStyles(styles)(ToggleTheme));