import React from 'react';
import { Play, Pause, Square, SkipForward, AlertCircle } from 'lucide-react';

interface ControlPanelProps {
  isRecording: boolean;
  onRecordingChange: (recording: boolean) => void;
  onEndInterview: () => void;
  onNextQuestion: () => void;
  canGoNext: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  isRecording,
  onRecordingChange,
  onEndInterview,
  onNextQuestion,
  canGoNext
}) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-6">
      <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
        <Play className="h-5 w-5" />
        <span>Interview Controls</span>
      </h3>

      <div className="space-y-4">
        {/* Recording Control */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onRecordingChange(!isRecording)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              isRecording
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isRecording ? (
              <>
                <Pause className="h-4 w-4" />
                <span>Pause Recording</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                <span>Start Recording</span>
              </>
            )}
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onNextQuestion}
            disabled={!canGoNext}
            className="flex items-center space-x-2 px-4 py-3 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white transition-all duration-200"
          >
            <SkipForward className="h-4 w-4" />
            <span>Next Question</span>
          </button>
        </div>

        {/* End Interview */}
        <div className="pt-4 border-t border-slate-700">
          <button
            onClick={onEndInterview}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium bg-orange-600 hover:bg-orange-700 text-white transition-all duration-200"
          >
            <Square className="h-4 w-4" />
            <span>End Interview</span>
          </button>
        </div>

        {/* Tips */}
        <div className="bg-slate-700/50 rounded-lg p-4 mt-6">
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-slate-300 text-sm">
              <p className="font-medium mb-2">Interview Tips:</p>
              <ul className="space-y-1 text-xs">
                <li>• Maintain eye contact with the camera</li>
                <li>• Use specific examples in your answers</li>
                <li>• Take your time to think before responding</li>
                <li>• Speak clearly and at a steady pace</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};