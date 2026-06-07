import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Crop, RefreshCw, Layers, Check, Settings, Sparkles, Move } from 'lucide-react';
import AdSensePlaceholder from './AdSensePlaceholder';

interface ResizeConfig {
  width: number;
  height: number;
  aspectRatio: number;
  lockAspectRatio: boolean;
  scaleMethod: 'bilinear' | 'pixelated';
  rotation: number; // 0, 90, 180, 270
}

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);

  const [config, setConfig] = useState<ResizeConfig>({
    width: 800,
    height: 600,
    aspectRatio: 4 / 3,
    lockAspectRatio: true,
    scaleMethod: 'bilinear',
    rotation: 0
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string>('');
  const [targetType, setTargetType] = useState<'png' | 'jpeg' | 'webp'>('png');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setupFile(e.target.files[0]);
    }
  };

  const setupFile = (selectedFile: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl('');
    }

    const url = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreviewUrl(url);

    const img = new Image();
    img.src = url;
    img.onload = () => {
      setOriginalWidth(img.width);
      setOriginalHeight(img.height);
      setConfig((prev) => ({
        ...prev,
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height
      }));
    };
  };

  // Dimensions adjustment helpers
  const handleWidthChange = (val: number) => {
    if (config.lockAspectRatio) {
      const computedHeight = Math.round(val / config.aspectRatio);
      setConfig((prev) => ({ ...prev, width: val, height: computedHeight }));
    } else {
      setConfig((prev) => ({ ...prev, width: val }));
    }
  };

  const handleHeightChange = (val: number) => {
    if (config.lockAspectRatio) {
      const computedWidth = Math.round(val * config.aspectRatio);
      setConfig((prev) => ({ ...prev, height: val, width: computedWidth }));
    } else {
      setConfig((prev) => ({ ...prev, height: val }));
    }
  };

  const handleAspectRatioChange = (ratioVal: number, label: string) => {
    if (ratioVal === 0) {
      setConfig((prev) => ({ ...prev, lockAspectRatio: false }));
    } else {
      const computedHeight = Math.round(config.width / ratioVal);
      setConfig((prev) => ({
        ...prev,
        aspectRatio: ratioVal,
        lockAspectRatio: true,
        height: computedHeight
      }));
    }
  };

  const handleResizeCompile = () => {
    if (!file || !previewUrl) return;
    setIsProcessing(true);

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Failed to start Canvas engine context');

        const width = config.width;
        const height = config.height;

        const isRotated90 = config.rotation === 90 || config.rotation === 270;
        canvas.width = isRotated90 ? height : width;
        canvas.height = isRotated90 ? width : height;

        if (targetType === 'jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        if (config.scaleMethod === 'pixelated') {
          ctx.imageSmoothingEnabled = false;
        } else {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
        }

        if (config.rotation > 0) {
          ctx.translate(canvas.width / 2, canvas.height / 2);
          ctx.rotate((config.rotation * Math.PI) / 180);
          ctx.drawImage(img, -width / 2, -height / 2, width, height);
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }

        const mimeString = `image/${targetType}`;
        canvas.toBlob((blob) => {
          if (blob) {
            if (downloadUrl) URL.revokeObjectURL(downloadUrl);
            const freshDlUrl = URL.createObjectURL(blob);
            setDownloadUrl(freshDlUrl);
          }
          setIsProcessing(false);
        }, mimeString, 0.92);
      } catch (err) {
        setIsProcessing(false);
        alert('Resize runtime err: ' + (err instanceof Error ? err.message : 'Unknown compilation failure'));
      }
    };
  };

  const triggerDownload = () => {
    if (!downloadUrl) return;
    const baseName = file?.name.substring(0, file.name.lastIndexOf('.')) || 'optipic_resized';
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = `${baseName}_resized_${config.width}x${config.height}.${targetType}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const commonRatios = [
    { label: 'Free Aspect', value: 0 },
    { label: 'Square (1:1)', value: 1 },
    { label: 'Standard (4:3)', value: 4 / 3 },
    { label: 'Landscape (16:9)', value: 16 / 9 },
    { label: 'Portrait (9:16)', value: 9 / 16 },
  ];

  return (
    <div className="space-y-6" id="image-resizer-container">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/15 hover:border-blue-500 bg-[#111111] hover:bg-[#151515] rounded-3xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[300px] group relative overflow-hidden"
          id="resizer-empty-dropzone"
        >
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="resizer-file-input"
          />
          <div className="w-14 h-14 rounded-full bg-white/5 group-hover:bg-blue-600/10 group-hover:border-blue-500/50 flex items-center justify-center border border-white/10 transition-all mb-4">
            <Crop className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-lg font-black uppercase tracking-tight text-white font-display">
            CHOOSE PHOTO TO RESIZE
          </h3>
          <p className="text-[11px] text-white/40 max-w-sm mt-1 mb-4 uppercase tracking-wider font-mono">
            Proportional scale, aspect-ratio lock presets, custom pixel bounding boxes, or instant rotate transformations.
          </p>
          <span className="bg-white/10 hover:bg-white/20 group-hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
            Browse File Offline
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main live preview block */}
          <div className="lg:col-span-2 bg-[#111111] rounded-3xl border border-white/5 p-6 flex flex-col justify-between space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-white/5">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                <Crop className="w-4 h-4 text-blue-400" />
                WORKSPACE LIGHTBOARD
              </span>
              <button
                onClick={() => {
                  setFile(null);
                  setPreviewUrl('');
                  setDownloadUrl('');
                }}
                id="btn-remove-resizer-img"
                className="text-[10px] uppercase font-bold tracking-widest text-rose-400 hover:text-rose-500 transition-colors bg-transparent border-0 cursor-pointer"
              >
                Clear Workspace
              </button>
            </div>

            {/* Rotatable source image container */}
            <div className="bg-[#0f0f0f] rounded-2xl p-6 min-h-[350px] flex items-center justify-center border border-white/5 relative overflow-hidden">
              <img
                src={previewUrl}
                alt="Selected asset canvas preview"
                className="max-h-[320px] object-contain shadow-2xl rounded-xl transition-transform duration-300 border border-white/10"
                style={{
                  transform: `rotate(${config.rotation}deg)`,
                }}
              />
              <div className="absolute bottom-4 left-4 bg-black/80 border border-white/10 text-[9px] text-[#A6A6A6] px-3 py-1 rounded font-mono uppercase tracking-wider">
                SOURCE RESOLUTION: {originalWidth}x{originalHeight}PX
              </div>
            </div>

            {/* Downstream Results Action Block */}
            {downloadUrl ? (
              <div className="bg-emerald-950/40 border border-emerald-900/30 p-4.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fade-in">
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block">✓ RESIZE RENDER COMPLETED!</span>
                  <p className="text-[10px] font-mono text-emerald-500 uppercase mt-0.5 tracking-wider">
                    Output dimensions secured at {config.width}x{config.height}px size format.
                  </p>
                </div>
                <button
                  onClick={triggerDownload}
                  id="btn-download-resized"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0 select-none cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Save Photo
                </button>
              </div>
            ) : (
              <div className="text-[10px] text-white/30 uppercase font-bold tracking-widest text-center font-mono">
                [Configure presets on the right, then trigger "Render Resized Asset" to lock parameters]
              </div>
            )}
          </div>

          {/* Configurations sidebar panel */}
          <div className="space-y-6">
            
            {/* Box settings */}
            <div className="bg-[#111111] rounded-3xl border border-white/5 p-6 space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-1.5 border-b border-white/5 pb-3 font-display">
                <Settings className="w-4 h-4 text-blue-400" />
                TUNING METRICS
              </h3>

              {/* Aspect Ratio selector buttons with heavy borders */}
              <div className="space-y-2">
                <label className="text-[9px] text-[#8C8C8C] font-bold uppercase tracking-widest font-mono block">ASPECT PRESET RATIO</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {commonRatios.map((ratio) => (
                    <button
                      key={ratio.label}
                      id={`preset-ratio-${ratio.label.toLowerCase().replace(/\s+|\(|\)|:/g, '_')}`}
                      onClick={() => handleAspectRatioChange(ratio.value, ratio.label)}
                      className="px-4 py-2.5 border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 text-[10px] rounded-xl text-white/80 font-bold uppercase tracking-widest text-left transition-all truncate cursor-pointer"
                    >
                      {ratio.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Constraint proportion toggle */}
              <div className="flex items-center gap-2.5 py-1 select-none">
                <input
                  type="checkbox"
                  id="lock-ratio-checkbox"
                  checked={config.lockAspectRatio}
                  onChange={(e) => setConfig((prev) => ({ ...prev, lockAspectRatio: e.target.checked }))}
                  className="w-4 h-4 accent-blue-600 border-white/15 bg-[#1a1a1a] focus:ring-blue-500 rounded cursor-pointer"
                />
                <label htmlFor="lock-ratio-checkbox" className="text-[10px] font-bold uppercase tracking-wider text-white/70 cursor-pointer font-mono">
                  LOCK AS SPECIFIED PROPORTIONS
                </label>
              </div>

              {/* W and H input blocks */}
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#8C8C8C] font-bold uppercase tracking-widest font-mono block">Width (Pixels)</label>
                  <input
                    type="number"
                    value={config.width}
                    id="resize-width-input"
                    onChange={(e) => handleWidthChange(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/5 focus:bg-white/10 focus:border-white/10 focus:outline-none rounded-xl text-xs font-bold text-white font-mono"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#8C8C8C] font-bold uppercase tracking-widest font-mono block">Height (Pixels)</label>
                  <input
                    type="number"
                    value={config.height}
                    id="resize-height-input"
                    onChange={(e) => handleHeightChange(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/5 focus:bg-white/10 focus:border-white/10 focus:outline-none rounded-xl text-xs font-bold text-white font-mono"
                  />
                </div>
              </div>

              {/* Orientation angle switcher */}
              <div className="space-y-3.5 pt-3 border-t border-white/5">
                <div className="space-y-1.5">
                  <label className="text-[9px] text-[#8C8C8C] font-bold uppercase tracking-widest font-mono block">TRANSPOSE INTER-ROTATION</label>
                  <div className="grid grid-cols-4 gap-1.5 bg-white/5 p-1 rounded-xl">
                    {([0, 90, 180, 270] as const).map((deg) => (
                      <button
                        key={deg}
                        id={`rotate-deg-${deg}`}
                        onClick={() => setConfig((prev) => ({ ...prev, rotation: deg }))}
                        className={`py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer uppercase ${
                          config.rotation === deg
                            ? 'bg-blue-600 text-white'
                            : 'text-white/40 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {deg}°
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sub-parameters selects */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-[9px] text-[#8C8C8C] font-bold uppercase tracking-widest font-mono block">SAMPLING FILTER</label>
                    <select
                      value={config.scaleMethod}
                      id="resize-algorithm-select"
                      onChange={(e) => setConfig((prev) => ({ ...prev, scaleMethod: e.target.value as any }))}
                      className="w-full bg-[#151515] border border-white/5 rounded-xl px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider text-white/80 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="bilinear">Smooth (Default)</option>
                      <option value="pixelated">Crisp (Pixelate)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] text-[#8C8C8C] font-bold uppercase tracking-widest font-mono block">EXPORT TYPE</label>
                    <select
                      value={targetType}
                      id="resize-format-select"
                      onChange={(e) => setTargetType(e.target.value as any)}
                      className="w-full bg-[#151515] border border-white/5 rounded-xl px-2.5 py-2 text-[10px] font-bold uppercase tracking-wider text-white/80 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="png">PNG (Lossless)</option>
                      <option value="jpeg">JPG (Standard)</option>
                      <option value="webp">WebP (NextGen)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Render Trigger action block */}
              <button
                onClick={handleResizeCompile}
                disabled={isProcessing}
                id="btn-render-resized"
                className="w-full mt-2.5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-1.5 select-none cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${isProcessing ? 'animate-spin' : ''}`} />
                {isProcessing ? 'PROCESSING BATCH...' : 'Render Resized Asset'}
              </button>
            </div>

            {/* Vertical Sidebar sponsor widget */}
            <AdSensePlaceholder type="sidebar" />
          </div>

        </div>
      )}
    </div>
  );
}
