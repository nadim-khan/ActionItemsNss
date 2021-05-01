import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import FindReplaceIcon from "@material-ui/icons/FindReplace";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxHeight: "10vh",
    height: "auto",
  },
  toolBar: {
    maxHeight: "10vh",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Filter = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e,val) => {
      console.log(val)
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar className={classes.toolBar}>
          <Tooltip title="Select Search Criteria" placement="top" arrow>
            <Button
              edge="start"
              className={classes.menuButton}
              color="default"
              aria-label="menu"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <FindReplaceIcon />
              {!anchorEl ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </Button>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={(e)=>handleClose(e,"Created By")} value="Created By">
                Created By
            </MenuItem>
            <MenuItem onClick={(e)=>handleClose(e,"Assigned To")} value="Created By">Assigned To</MenuItem>
            <MenuItem onClick={(e)=>handleClose(e,"Start Date")} value="Start Date">Start Date</MenuItem>
            <MenuItem onClick={(e)=>handleClose(e,"End Date")} value="End Date">End Date</MenuItem>
          </Menu>
          <Typography className={classes.title}></Typography>
          <Button color="primary" variant="contained">
            Apply Filter
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Filter;
