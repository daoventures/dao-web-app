import React, { Component } from 'react'
import { LinearProgress } from '@material-ui/core'
import {
  CURRENT_THEME_RETURNED,
} from '../../constants'

import Store from "../../stores/storev2";
const emitter = Store.emitter
const dispatcher = Store.dispatcher
const store = Store.store

class Loader extends Component {
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
    return (
      // <div style={{ position: 'absolute', left: '0px', right: '0px', top: '0px'}}>
      //   <LinearProgress />
      // </div>
      // <div style={{position: 'fixed', 
      //   left: '0px', 
      //   right: '0px', 
      //   top: '0px', 
      //   bottom: '0px',
      //   display: 'flex',
      //   alignItems: 'center',
      //   justifyContent: 'center',
      //   background: 'rgba(0, 0, 0, 0.4)',
      //   zIndex: '99999'
      // }}>
      //   <img style={{width: '100px'}} src={this.state.currentTheme === 'dark' ? require("../../assets/img_new/loading-dark.gif") : require("../../assets/img_new/loadinga_light.gif")}/>
      // </div>
      <div></div>
    )
  }
}

export default Loader
