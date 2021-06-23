import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

const styles =theme=>({

});
class PageTitle extends Component {

    constructor() {
      super()
    }

    render(){
        return (<div>
            1
        </div>)
    }
}
export default withRouter(withStyles(styles)(PageTitle));
