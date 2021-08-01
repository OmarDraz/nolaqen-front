
import React, { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";
import FullScreen from "@material-ui/icons/Fullscreen";
import Grid from "@material-ui/core/Grid";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeDownIcon from "@material-ui/icons/VolumeDown";
import VolumeMuteIcon from "@material-ui/icons/VolumeOff";
import FullScreenIcon from "@material-ui/icons/Fullscreen";
import Popover from "@material-ui/core/Popover";
import vidIcon from './videoIcon.png';
import Logo from '../../svg/nolaqen.svg'


const useStyles = makeStyles((theme) => ({
  controlsWrapper: {
    visibility: 'hidden',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    background: "rgba(0,0,0,0.9)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (max-width : 696px)": {
      height: '95%'
    },
  },
  grid:{
    overflow: 'hidden',
    "& .MuiGrid-item":{
      color: 'white'
    }
  },
  controlIcons: {
    color: "#777",
    fontSize: 50,
    transform: "scale(0.9)",
    transition: '0.2s ease-in-out',
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
    "@media (max-width: 696px)":{
      fontSize: 30,
      overflow: 'hidden'
    }
  },
  prettoContainer: {
    padding: '0 16px',
    overflow: 'hidden',
    "@media (max-width: 696px)": {
      padding: '0px 16px',
      height: '15%'
    }
  },
  bottomIcons: {
    color: "#999",
    fontSize: 25,
    transition: '0.2s ease-in-out',
    "&:hover": {
      color: "#fff",
    },
    "@media (max-width: 696px)": {
      fontSize: '3px'
    }
  },
  volumeSlider: {
    width: 100,
    "@media (max-width: 696px)":{
      width: 70
    }
  },
  bottomControls:{
    overflow: 'hidden',
    "@media (max-width: 696px)": {
      "& .MuiSlider-thumb":{
        width: 6,
        height: 6,
        marginTop: -3,
        marginLeft: 0
      },
      "& .MuiSlider-rail": {
        height: 1
      },
      "& .MuiSlider-track": {
        height: 1
      },
      "& .MuiSvgIcon-root":{
        fontSize: 18
      }
    }
  },
  popover: {
    "& .MuiPaper-root": {
      background: '#000',
      "@media (max-width: 696px)":{
        width: 60
      }
    }
  },
  elapsedTime: {
    color: 'white',
    marginLeft: 16,
    "@media (max-width: 696px)":{
      fontSize: '10px',
      marginLeft: 18
    }
  },
  lessonName:{
    "@media (max-width: 696px)":{
      fontSize: 14
    }
  }
}))

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: 1,
    marginRight: 1,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
    "@media (max-width: 696px)": {
      width: '10px',
      height: '10px',
      marginTop: '-3px',
      marginLeft: 0
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
    "@media (max-width: 696px)": {
      height: 4
    }

  },
  rail: {
    height: 8,
    borderRadius: 4,
    "@media (max-width: 696px)": {
      height: 4
    }
  },
})(Slider);

function ValueLabelComponent(prop) {
  const { children, open, value } = prop;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

const Controls = forwardRef ((props, ref) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const classes = useStyles()
  return(
    <div className={classes.controlsWrapper} ref={ref}>
      <Grid container alignItems="center" className={classes.grid}>
        <Grid item xs={6} className={classes.lessonName} style={{ padding: '2%', width: '15%', color: 'white' }}>
          {props.lessonName} 
        </Grid>
        <Grid item xs={6} align="left" style={{ padding: '2%' }}>
          <img src={Logo} style={{ width: '15%' }} />
        </Grid>
      </Grid>
      <Grid container style={{ width: '35%', margin: 'auto', overflow: 'hidden' }}>
        <Grid item xs={4} align="left">
          <IconButton onClick={props.forwarding}>
            <FastForwardIcon className={classes.controlIcons} />
          </IconButton>
        </Grid>
        <Grid item xs={4} align="center">
          <IconButton onClick={props.playPause}>
            {props.playing ? <PauseIcon className={classes.controlIcons} /> : <PlayArrowIcon className={classes.controlIcons} />}
          </IconButton>
        </Grid>
        <Grid item xs={4} align="right">
          <IconButton onClick={props.rewind}>
            <FastRewindIcon className={classes.controlIcons} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.prettoContainer}>
        <Grid item xs={12}>
          <PrettoSlider min={0} max={100} 
                ValueLabelComponent={(prop) => (
                  <ValueLabelComponent {...prop} value={props.elapsedTime} />
                )}
                aria-label="custom thumb label"
                value={props.played}
                onChange={props.onSeek}
                onMouseDown={props.onSeekMouseDown}
                onChangeCommitted={props.onSeekMouseUp}
                onDuration={props.onDuration}/>
        </Grid>
      </Grid>
      <Grid container direction="row" className={classes.bottomControls} justify="space-between"  alignItems="center">
        <Grid item >
          <Button
              onClick={handleClick}
              className={classes.bottomIcons}
              variant="text"
                >
                  <Typography>{props.playbackRate}X</Typography>
          </Button>
          <Popover
                className={classes.popover}
                open={open}
                id={id}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Grid container direction="column-reverse">
                  {[0.5, 1, 1.5, 2].map((rate) => (
                    <Button
                      onClick={() => props.handlePlaybackRate(rate)}
                      key={rate}
                      variant="text"
                    >
                      <Typography
                      
                        color={rate === props.playbackRate ? "secondary" : "primary"}
                      >
                        {rate}X
                      </Typography>
                    </Button>
                  ))}
                </Grid>
              </Popover>
              <IconButton
                onClick={props.toggleFullScreen}
                className={classes.bottomIcons}
              >
                <FullScreen />
              </IconButton>
        </Grid>
        <Grid item style={{ display: 'flex', alignItems: 'center' }}>
          
          <span className={classes.elapsedTime}>{props.elapsedTime}/{props.totalDuration}</span>
          <Slider
                  min={0}
                  max={100}
                  value={props.muted ? 0 : props.volume * 100}
                  onChange={props.onVolumeChange}
                  aria-labelledby="input-slider"
                  className={classes.volumeSlider}
                  onMouseDown={props.onSeekMouseDown}
                  onChangeCommitted={props.onVolumeSeekDown}
                />
          <IconButton onClick={props.muting} className={classes.bottomIcons}>
            {props.muted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
          </IconButton>
          <IconButton onClick={props.playPause} className={classes.bottomIcons}>
            {props.playing ? <PauseIcon /> : <PlayArrowIcon /> }
          </IconButton>
        </Grid>
      </Grid>
      
    </div>
  )
})
export default Controls;
