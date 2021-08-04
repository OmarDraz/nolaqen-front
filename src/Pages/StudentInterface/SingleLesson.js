import React, { useState, useRef, useEffect } from 'react';
import screenful from "screenfull";
import { Container, Grid, makeStyles, withStyles, Button, IconButton, Typography } from '@material-ui/core';
import ReactHlsPlayer from 'react-hls-player';
import Decorators from '../../svg/decorators2.svg'
import Controls from './PlayerControls'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios';

const useStyles = makeStyles({
    playerWrapper: {
        overflow: 'hidden',
        width: '80%',
        position: 'relative',
        margin: 'auto',
        height: 'auto',
        "@media (max-width: 696px)":{
          width: '100%',
        }
    },
    vidsvg:{
      "@media (min-width: 400px)":{
        display: 'none',
      }
    }
  })

  const format = (seconds) => {
    if (isNaN(seconds)) {
      return `00:00`;
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  };
  
  let count = 0;

const SingleLesson = () => {
    let {lessonId} = useParams();
    const [lessonDetails, setLessonDetails] = useState({})
    const playerRef = useRef(null);
    const playerContainerRef = useRef(null);
    const controlsRef = useRef(null);
    const canvasRef = useRef(null);
    const [played, setPlayed] = useState(0)
    const [elapsedTime, setElapsedTime] = useState(0)
    const [state, setState] = useState({
      playing: false,
      muted: false,
      playbackRate: 1.0,
      seeking: false,
      duration: 0,
      volume: 1,
    })

    const {
      playing,
      muted,
      playbackRate,
      seeking,
      volume
    } = state

  const playingPromise = async () => {
    const promise = new Promise(() => {
      setState({...state, playing: !state.playing})
    })
  }

    const handleVideoPlayPause = () => {
      playingPromise().then(() => {
        !state.playing ?
        playerRef.current.play() :
        playerRef.current.pause()
      })
      
    }
    const handleRewind = () => {
      playerRef.current.currentTime = playerRef.current.currentTime - 10
    }
    const handleForwarding = () => {
      playerRef.current.currentTime = playerRef.current.currentTime + 10
    }


    const mutePromise = async () => {
      const promise = new Promise(() => {
        setState({...state, muted: !state.muted})
      })
    }

    const handleMute = () => {
      mutePromise().then(() => {
        !state.muted ?
        playerRef.current.muted = true :
        playerRef.current.muted = false
      }) 
    }

    const handleVolumeSeekDown = (e, newValue) => {
      setState({ ...state, seeking: false, volume: parseFloat(newValue / 100) });
    };
    const handleVolumeChange = (e, newValue) => {
      // console.log(newValue);
      setState({
        ...state,
        volume: parseFloat(newValue / 100),
        muted: newValue === 0 ? true : false,
      });
      playerRef.current.volume = volume
    };

    const handleDuration = (duration) => {
      setState({ ...state, duration });
    };

    const toggleFullScreen = () => {
      screenful.toggle(playerContainerRef.current);
    };

    const handlePlaybackRate = (rate) => {
      setState({ ...state, playbackRate: rate });
      playerRef.current.playbackRate = rate
    };
    const handleSeekChange = (e, newValue) => {
      console.log('change',{ newValue });
      setState({ ...state, played: parseFloat(newValue / 100) });
    };
  
    const handleSeekMouseDown = (e) => {
      setState({ ...state, seeking: true });
    };
  
    

    const duration = playerRef && playerRef.current ? playerRef.current.duration : "00:00";

    const handleSeekMouseUp = (e, newValue) => {
      console.log('up', { value: e.target });
      setState({ ...state, seeking: false });
      // console.log(sliderRef.current.value)
      playerRef.current.currentTime = (duration / 100) * newValue ;
    };

    const totalDuration = format(duration);

      const classes = useStyles();

      useEffect(() => {
        axiosInstance.get('lessons/views/' + lessonId).then((res) => setLessonDetails(res.data)).then(() => {
          const interval = setInterval(() => {
            const currentTime = playerRef && playerRef.current
            ? playerRef.current.currentTime
            : "00:00";
  
          const elapsedTime = format(currentTime)
          setElapsedTime(elapsedTime)
          setPlayed(Math.floor((currentTime / playerRef.current.duration) * 100))
          }, 1000)
        })
      }, [])

      const handleMouseMove = () => {
        console.log("mousemove");
        controlsRef.current.style.visibility = "visible";
        count = 0;

        setTimeout(() => {
        controlsRef.current.style.visibility = "hidden";
        }, 3000)
      };

    

    return(
        <>
            <img src={Decorators} style={{ width: '100%', height: '100vh', position: 'absolute', right: 0, top: 20, overflow: 'hidden', zIndex: -1 }} />
            <Container style={{margin: '10px auto'}}>
                <h3 style={{borderBottom: '2px solid #ccc', margin: '10px 0 20px', width: '25%',}}>{lessonDetails.name}</h3>
                <div 
                className={classes.playerWrapper}
                ref={playerContainerRef}
                onMouseMove={handleMouseMove}
                >
                <ReactHlsPlayer
                  playerRef={playerRef}
                  src={lessonDetails.source}
                  width="100%"
                  height="100%"
                />
                <Controls
                ref={controlsRef}
                playPause={handleVideoPlayPause}
                playing={playing}
                rewind={handleRewind}
                played={played}
                forwarding={handleForwarding}
                muting={handleMute}
                muted={muted}
                toggleFullScreen={toggleFullScreen}
                playbackRate={playbackRate}
                handlePlaybackRate={handlePlaybackRate}
                elapsedTime={elapsedTime}
                totalDuration={totalDuration}
                onVolumeChange={handleVolumeChange}
                onVolumeSeekDown={handleVolumeSeekDown}
                onSeek={handleSeekChange}
                onSeekMouseDown={handleSeekMouseDown}
                onSeekMouseUp={handleSeekMouseUp}
                onDuration={handleDuration}
                volume={volume}
                lessonName={lessonDetails.name}
                />
                </div>
                <div style={{ marginTop: '10px' }}>
                <span style={{ color: 'rgba(0,0,0,0.5)' }}>نشر في {lessonDetails.created_at}</span>
                <p style={{ fontSize: '18px', letterSpacing: 0.5 }}>{lessonDetails.description}</p>
                </div>
            </Container>
            {console.log(totalDuration)}
        </>
    )
}
export default SingleLesson 