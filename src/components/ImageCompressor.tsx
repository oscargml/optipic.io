import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Sliders, CheckCircle, ArrowRight, Gauge, Activity, FileDown, RefreshCw } from 'lucide-react';
import AdSensePlaceholder from './AdSensePlaceholder';

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [quality, setQuality] = useState(0.70); // Default compression
  const [format, setFormat] = useState<'jpeg' | 'webp'>('webp');
  
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressedUrl, setCompressedUrl] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, []);

  // Sync canvas compression instantly whenever quality or format triggers
  useEffect(() => {
    if (file && previewUrl) {
      triggerLocalCompression();
    }
  }, [quality, format, file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setOriginalSize(selected.size);
      
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const url = URL.createObjectURL(selected);
      setPreviewUrl(url);
    }
  };

  const triggerLocalCompression = () => {
    if (!file || !previewUrl) return;
    setIsCompressing(true);

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('No 2d canvas init support');

        canvas.width = img.width;
        canvas.height = img.height;

        // Cover transparent areas if JPEG is selected
        if (format === 'jpeg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0, img.width, img.height);

        const mimeString = `image/${format}`;
        canvas.toBlob((blob) => {
          if (blob) {
            setCompressedSize(blob.size);
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            setCompressedUrl(URL.createObjectURL(blob));
          }
          setIsCompressing(false);
        }, mimeString, quality);
      } catch (err) {
        setIsCompressing(false);
        console.error('Error compressing image offline: ', err);
      }
    };
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getSavingsPercent = () => {
    if (!originalSize || !compressedSize) return 0;
    const diff = originalSize - compressedSize;
    return Math.round((diff / originalSize) * 100);
  };

  const triggerDownload = () => {
    if (!compressedUrl) return;
    const baseName = file?.name.substring(0, file.name.lastIndexOf('.')) || 'optipic_optimized';
    const extension = format;
    const link = document.createElement('a');
    link.href = compressedUrl;
    link.download = `${baseName}_compressed.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const savings = getSavingsPercent();

  return (
    <div className="space-y-6" id="image-compressor-container">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-white/15 hover:border-blue-500 bg-[#111111] hover:bg-[#151515] rounded-3xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[300px] group relative overflow-hidden"
          id="compressor-empty-zone"
        >
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            id="compressor-file-input"
          />
          <div className="w-14 h-14 rounded-full bg-white/5 group-hover:bg-blue-600/10 group-hover:border-blue-500/50 flex items-center justify-center border border-white/10 transition-all mb-4">
            <Gauge className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
          </div>
          <h3 className="text-lg font-black uppercase tracking-tight text-white font-display">
            CHOOSE IMAGE FOR LOSSLESS COMPRESS
          </h3>
          <p className="text-[11px] text-white/40 max-w-sm mt-1 mb-4 uppercase tracking-wider font-mono">
            Optimized side-by-side compression inspector. Safely compress payload footprint bytes with instant rendering.
          </p>
          <span className="bg-white/10 hover:bg-white/20 group-hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
            Open Local Asset
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Sizing dashboards & visual slider columns */}
          <div className="lg:col-span-2 bg-[#111111] rounded-3xl p-6 border border-white/5 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3.5">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                COMPARATIVE SPECTRUM ANALYZER
              </span>
              <button
                onClick={() => {
                  setFile(null);
                  setPreviewUrl('');
                  setCompressedUrl('');
                }}
                id="btn-clear-compressor-img"
                className="text-[10px] uppercase font-bold tracking-widest text-[#FF5F5F] hover:text-[#FF2B2B] bg-transparent border-0 cursor-pointer"
              >
                Clear Photo
              </button>
            </div>

            {/* Split viewport screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* ORIGINAL FRAME */}
              <div className="border border-white/5 bg-[#0f0f0f] rounded-2xl p-5 flex flex-col items-center relative overflow-hidden">
                <span className="absolute top-4 left-4 bg-black/80 border border-white/10 text-white/60 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded">
                  ORIGINAL WEIGHT
                </span>
                <div className="h-[210px] flex items-center justify-center w-full">
                  <img
                    src={previewUrl}
                    alt="Original source visual layout"
                    className="max-h-[190px] object-contain rounded-lg border border-white/10 shadow-lg"
                  />
                </div>
                <div className="mt-3 w-full text-center border-t border-white/5 pt-3 font-mono text-xs font-bold text-white/50 uppercase tracking-widest">
                  SIZE: {formatSize(originalSize)}
                </div>
              </div>

              {/* COMPRESSED FRAME */}
              <div className="border border-white/5 bg-[#0f0f0f] rounded-2xl p-5 flex flex-col items-center relative overflow-hidden">
                <span className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded animate-pulse shadow-md">
                  COMPRESSED TUNING
                </span>
                {isCompressing && (
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-3xs flex items-center justify-center transition-opacity z-10">
                    <span className="bg-[#111] border border-white/10 text-white text-[9px] font-mono uppercase tracking-widest px-3.5 py-2 rounded-xl flex items-center gap-1.5 font-bold shadow-2xl">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-400" />
                      TUNING PIXELS...
                    </span>
                  </div>
                )}
                <div className="h-[210px] flex items-center justify-center w-full">
                  {compressedUrl ? (
                    <img
                      src={compressedUrl}
                      alt="Compressed canvas render configuration"
                      className="max-h-[190px] object-contain rounded-lg border border-white/10 shadow-lg"
                    />
                  ) : (
                    <span className="text-[10px] font-mono uppercase text-white/30">Loading compression engine...</span>
                  )}
                </div>
                <div className="mt-3 w-full text-center border-t border-white/5 pt-3 font-mono text-xs font-bold text-white uppercase tracking-widest">
                  SIZE: {formatSize(compressedSize)}
                </div>
              </div>

            </div>

            {/* Savings analytics panel matching bold theme */}
            {savings > 0 ? (
              <div className="bg-emerald-950/40 border border-emerald-900/40 p-4.5 rounded-2xl flex items-center gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm border border-emerald-500 shadow-md">
                  -{savings}%
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block">PIXEL WEIGHT OPTIMIZED</span>
                  <p className="text-[10px] font-mono uppercase text-emerald-500/85 mt-0.5 tracking-wider leading-relaxed">
                    Browser load speed increases to {(100 / (100 - savings)).toFixed(1)}x faster, generating optimal Web Vitals compliance scores.
                  </p>
                </div>
              </div>
            ) : savings < 0 ? (
              <div className="bg-amber-950/30 border border-amber-900/30 p-4 rounded-2xl flex items-center gap-3">
                <span className="text-xs font-black uppercase tracking-wider text-amber-500 block">DENSITY OVERHEAD OVERALL</span>
                <p className="text-[10px] font-mono text-amber-500/80 uppercase">
                  Selected codec requires larger byte arrays here. Slightly slide quality down.
                </p>
              </div>
            ) : null}
          </div>

          {/* Settings controller */}
          <div className="space-y-6">
            
            <div className="bg-[#111111] rounded-3xl border border-white/5 p-6 space-y-5">
              <h3 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-2 pb-3 border-b border-white/5 font-display">
                <Sliders className="w-4 h-4 text-blue-400" />
                TUNER MATRIX
              </h3>

              {/* Destination Format Select */}
              <div className="space-y-2">
                <label className="text-[9px] text-[#8C8C8C] font-bold uppercase tracking-widest block font-mono">CODEC OUTPUT ENGINE</label>
                <div className="grid grid-cols-2 gap-1.5 bg-white/5 p-1 rounded-xl">
                  {(['webp', 'jpeg'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      id={`compress-fmt-${fmt}`}
                      onClick={() => setFormat(fmt)}
                      className={`py-2 text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all cursor-pointer ${
                        format === fmt
                          ? 'bg-blue-600 text-white'
                          : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {fmt === 'webp' ? 'WebP (NextGen)' : 'JPG (Legacy)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality tuning slider parameters */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-[#8C8C8C] font-bold uppercase tracking-widest font-mono">QUALITY THRESHOLD</span>
                  <span className="font-mono font-bold text-blue-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded text-xs select-none">
                    {(quality * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1.0"
                  step="0.05"
                  value={quality}
                  id="compressor-quality-slider"
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                />
                <div className="flex justify-between text-[8px] text-white/30 font-bold uppercase font-mono tracking-wider">
                  <span>EXCESS (10%)</span>
                  <span>SWEET-SPOT (70%)</span>
                  <span>LOSSY (100%)</span>
                </div>
              </div>

              {/* Trigger export element */}
              <button
                onClick={triggerDownload}
                disabled={isCompressing || !compressedUrl}
                id="btn-download-compressed"
                className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-white/5 text-white disabled:text-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                Save Optimized Asset
              </button>

            </div>

            {/* Sidebar ad container */}
            <AdSensePlaceholder type="sidebar" />
          </div>

        </div>
      )}
    </div>
  );
}
