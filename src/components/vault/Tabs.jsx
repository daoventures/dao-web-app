import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#292750",
    },
}));

function SimpleTabs(props) {
    const {classes} = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.Tabs}>
            <AppBar position="relative" color="white">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" className={classes.Tabs}>
                    <Tab label="Deposit & Stake" {...a11yProps(0)} />
                    <Tab label="Harvest & Compound" {...a11yProps(1)} />
                    <Tab label="Withdraw & Unstake" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className={classes.TabText}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1} className={classes.TabText}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2} className={classes.TabText}>
                Item Three
            </TabPanel>
        </div>
    );
}

export default SimpleTabs;