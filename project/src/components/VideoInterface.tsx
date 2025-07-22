import React, { useRef, useEffect, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, Monitor } from 'lucide-react';

interface VideoInterfaceProps {
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
}

export const VideoInterface: React.FC<VideoInterfaceProps> = ({
  isRecording,
  onRecordingChange
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraOn(videoTrack.enabled);
      }
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicOn(audioTrack.enabled);
      }
    }
  };

  return (
    <div className="bg-slate-800 rounded-2xl p-6 h-full">
      <div className="relative h-full bg-slate-900 rounded-xl overflow-hidden">
        {/* Video Feed */}
        <div className="relative h-full">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-600 px-3 py-2 rounded-full">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-sm">RECORDING</span>
            </div>
          )}

          {/* AI Interviewer Avatar */}
          <div className="absolute top-4 right-4 bg-blue-600/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Monitor className="h-6 w-6 text-white" />
            </div>
            <div className="text-center mt-2">
              <div className="text-white text-sm font-medium">AI Interviewer</div>
              <div className="text-blue-300 text-xs">Listening...</div>
            </div>
          </div>

          {/* Controls Overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full transition-colors duration-200 ${
                isCameraOn
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isCameraOn ? (
                <Camera className="h-5 w-5" />
              ) : (
                <CameraOff className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={toggleMic}
              className={`p-3 rounded-full transition-colors duration-200 ${
                isMicOn
                  ? 'bg-slate-700 hover:bg-slate-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isMicOn ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};