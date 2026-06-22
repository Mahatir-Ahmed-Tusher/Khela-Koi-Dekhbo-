'use client';
import { useEffect, useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, Play, Pause, VolumeX, Volume2, Maximize, Minimize, ChevronRight, X } from 'lucide-react';

export default function VideoPlayer({ channel, channelsList, onClose, className = '' }) {
  const { watchChannel, showToast } = useApp();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const hlsRef = useRef(null);

  const [status, setStatus] = useState(channel ? 'loading' : 'idle'); // 'idle' | 'loading' | 'playing' | 'error'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [showControls, setShowControls] = useState(false);
  const controlsTimeoutRef = useRef(null);

  // ----------------------------------------------------
  // HLS Playback Logic
  // ----------------------------------------------------
  useEffect(() => {
    let active = true;

    if (!channel?.url) {
      setStatus('idle');
      return;
    }
    if (!videoRef.current) {
      setStatus('error');
      return;
    }

    // Reset player state immediately
    if (hlsRef.current) {
      try {
        hlsRef.current.destroy();
      } catch (e) {
        console.warn('Error destroying HLS instance:', e);
      }
      hlsRef.current = null;
    }
    
    setStatus('loading');
    setIsPlaying(false);
    
    try {
      videoRef.current.pause();
      videoRef.current.src = '';
      videoRef.current.removeAttribute('src');
      videoRef.current.load();
    } catch (e) {
      console.warn('Error resetting video element:', e);
    }

    const tryPlay = async () => {
      try {
        const Hls = (await import('hls.js')).default;
        if (!active) return;

        if (Hls.isSupported()) {
          const hls = new Hls({ 
            enableWorker: true, 
            lowLatencyMode: true,
            maxMaxBufferLength: 10,
          });
          
          if (!active) {
            hls.destroy();
            return;
          }
          
          hlsRef.current = hls;
          hls.loadSource(channel.url);
          hls.attachMedia(videoRef.current);
          
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (!active) return;
            videoRef.current.play()
              .then(() => {
                if (!active) return;
                setStatus('playing');
                setIsPlaying(true);
              })
              .catch(() => {
                if (!active) return;
                setStatus('playing');
                setIsPlaying(false);
              });
          });

          hls.on(Hls.Events.ERROR, (_, data) => {
            if (!active) return;
            if (data.fatal) {
              console.warn('Fatal HLS error:', data.type);
              switch (data.type) {
                case Hls.ErrorTypes.NETWORK_ERROR:
                  hls.startLoad();
                  break;
                case Hls.ErrorTypes.MEDIA_ERROR:
                  hls.recoverMediaError();
                  break;
                default:
                  setStatus('error');
                  break;
              }
            }
          });
        } 
        // iOS Native Safari HLS support
        else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
          videoRef.current.src = channel.url;
          
          videoRef.current.onloadedmetadata = () => {
            if (!active) return;
            videoRef.current.play()
              .then(() => {
                if (!active) return;
                setStatus('playing');
                setIsPlaying(true);
              })
              .catch(() => {
                if (!active) return;
                setStatus('playing');
                setIsPlaying(false);
              });
          };

          videoRef.current.onerror = () => {
            if (!active) return;
            setStatus('error');
          };
        } else {
          setStatus('error');
        }
      } catch (err) {
        console.error('Player error:', err);
        if (active) setStatus('error');
      }
    };

    tryPlay();

    // Timeout fallback: if still loading after 15 seconds, flag error
    const timeout = setTimeout(() => {
      if (active) {
        setStatus(current => {
          if (current === 'loading') {
            return 'error';
          }
          return current;
        });
      }
    }, 15000);

    return () => {
      active = false;
      clearTimeout(timeout);
      
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch (e) {
          console.warn('Error destroying HLS on cleanup:', e);
        }
        hlsRef.current = null;
      }
      
      if (videoRef.current) {
        try {
          videoRef.current.onloadedmetadata = null;
          videoRef.current.onerror = null;
          videoRef.current.pause();
          videoRef.current.src = '';
          videoRef.current.removeAttribute('src');
          videoRef.current.load();
        } catch (e) {
          console.warn('Error clearing video source in cleanup:', e);
        }
      }
    };
  }, [channel?.url]);

  // Sync mute state and volume
  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
    videoRef.current.volume = volume;
  }, [isMuted, volume]);

  // Controls Auto-Hide
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (status === 'playing') setShowControls(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [status]);

  // Channel Navigation: Prev / Next
  const activeList = channelsList || [];
  const currentIdx = channel 
    ? activeList.findIndex(ch => ch.id === channel.id)
    : -1;

  const playNextChannel = () => {
    if (activeList.length <= 1) return;
    const nextIdx = (currentIdx + 1) % activeList.length;
    watchChannel(activeList[nextIdx]);
  };

  const playPrevChannel = () => {
    if (activeList.length <= 1) return;
    const prevIdx = (currentIdx - 1 + activeList.length) % activeList.length;
    watchChannel(activeList[prevIdx]);
  };

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      switch (e.key.toLowerCase()) {
        case 'k':
        case ' ': // spacebar
          e.preventDefault();
          togglePlay();
          break;
        case 'm':
          toggleMute();
          break;
        case 'f':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted, volume]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setStatus('playing');
        })
        .catch(() => {});
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
          // Try to lock orientation to landscape on mobile devices
          if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
            window.screen.orientation.lock('landscape').catch((err) => {
              console.warn('Orientation lock failed:', err);
            });
          }
        })
        .catch(() => {});
    } else {
      document.exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
          // Unlock orientation when exiting fullscreen
          if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
            try {
              window.screen.orientation.unlock();
            } catch (e) {}
          }
        })
        .catch(() => {});
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!document.fullscreenElement;
      setIsFullscreen(isFull);
      
      // If exiting fullscreen by any means (e.g. Esc or Android Back button), unlock orientation
      if (!isFull) {
        if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
          try {
            window.screen.orientation.unlock();
          } catch (e) {}
        }
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleFocusServerSelector = () => {
    const selector = document.getElementById('server-selector-container');
    if (selector) {
      selector.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add visual bump
      selector.classList.add('ring-2', 'ring-accent-gold');
      setTimeout(() => {
        selector.classList.remove('ring-2', 'ring-accent-gold');
      }, 1500);
    }
  };

  const containerStyle = status !== 'playing' ? {
    backgroundImage: `url('/blank-screen.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  } : {};

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setShowControls(false)}
      className={`relative bg-black overflow-hidden select-none flex items-center justify-center aspect-video w-full ${className}`}
      style={containerStyle}
    >
      {/* Close button (top right overlay, z-30) */}
      {onClose && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 z-30 p-2 rounded-xl bg-black/60 hover:bg-black/85 text-text-primary border border-white/10 transition-all cursor-pointer active:scale-95 flex items-center justify-center"
          aria-label="Close player"
        >
          <X size={15} />
        </button>
      )}

      {/* Dim overlay for non-playing states (loading, error, empty) */}
      {status !== 'playing' && (
        <div className="absolute inset-0 bg-bg-void/85 z-10 pointer-events-none" />
      )}

      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain cursor-pointer relative z-0"
        playsInline
        onClick={togglePlay}
      />

      {/* Idle / No Channel Selected Overlay */}
      {status === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent gap-3.5 z-20 p-6 text-center select-none animate-in fade-in duration-200">
          <div className="space-y-2">
            <h4 className="font-display font-black text-lg tracking-wide uppercase text-text-primary max-w-[320px] mx-auto leading-tight">
              Choose your favorite sports or entertainment channel
            </h4>
            <p className="text-[11px] text-text-secondary font-body max-w-[260px] mx-auto">
              Select any live server from the lists to begin watching immediately.
            </p>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {status === 'loading' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent gap-3 z-20">
          <div className="w-10 h-10 border-2 border-accent-gold border-t-transparent animate-spin rounded-full" />
          <div className="text-center">
            <p className="font-display font-bold text-sm tracking-wider uppercase text-text-primary">
              Connecting Stream
            </p>
            {channel && (
              <p className="text-[11px] text-text-secondary mt-1 font-body">{channel.name}</p>
            )}
          </div>
        </div>
      )}

      {/* Error Overlay - English error text and redirect button */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-transparent gap-3.5 z-20 p-4 text-center">
          <AlertCircle size={32} className="text-accent-live animate-pulse" />
          <div className="space-y-1">
            <h4 className="font-body font-medium text-[13px] text-text-secondary">
              Server Temporarily Offline
            </h4>
            {channel && (
              <p className="text-[11px] text-text-muted font-body max-w-[260px] mx-auto truncate">
                {channel.name}
              </p>
            )}
          </div>
          <button 
            onClick={handleFocusServerSelector}
            className="px-4 py-1.5 text-[11px] tracking-wider font-bold rounded-full bg-accent-gold text-bg-void hover:bg-accent-gold/90 transition-colors uppercase font-display cursor-pointer shadow-gold"
          >
            Try Another Server
          </button>
        </div>
      )}

      {/* Controls Overlay */}
      {status === 'playing' && (
        <>
          {/* Centered Large Play/Pause Toggle Indicator */}
          <div 
            onClick={togglePlay}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 bg-black/20 cursor-pointer ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="w-12 h-12 rounded-xl bg-bg-surface/80 border border-border-subtle flex items-center justify-center text-text-primary transition-transform active:scale-90">
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
            </div>
          </div>

          {/* Bottom Bar Controls */}
          <div className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between transition-opacity duration-300 z-10 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex items-center gap-3">
              <button 
                onClick={togglePlay}
                className="p-1 rounded text-text-primary hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              {/* Volume */}
              <div className="flex items-center gap-1.5 group/volume">
                <button 
                  onClick={toggleMute}
                  className="p-1 rounded text-text-primary hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-14 md:w-16 accent-accent-gold h-1 rounded-full bg-white/20 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Fullscreen Toggle */}
            <button 
              onClick={toggleFullscreen}
              className="p-1 rounded text-text-primary hover:bg-white/10 transition-colors cursor-pointer"
            >
              {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
