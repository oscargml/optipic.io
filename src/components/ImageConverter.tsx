import React, { useState, useRef } from 'react';
import { ProcessingImage } from '../types';
import { Upload, Download, RefreshCw, Trash2, Check, AlertTriangle, FileUp, Sparkles, FolderArchive, ArrowRight, Layers } from 'lucide-react';
import JSZip from 'jszip';
import AdSensePlaceholder from './AdSensePlaceholder';

export default function ImageConverter() {
  const [images, setImages] = useState<ProcessingImage[]>([]);
  const [targetFormat, setTargetFormat] = useState<'png' | 'jpeg' | 'webp'>('webp');
  const [quality, setQuality] = useState<number>(0.85);
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const addFiles = (files: File[]) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/svg+xml'];
    const newImages = files
      .filter((file) => validTypes.includes(file.type))
      .map((file) => {
        const id = Math.random().toString(36).substring(7);
        const previewUrl = URL.createObjectURL(file);
        
        const img = new Image();
        img.src = previewUrl;
        
        const initialImage: ProcessingImage = {
          id,
          file,
          name: file.name,
          originalSize: file.size,
          originalWidth: 0,
          originalHeight: 0,
          previewUrl,
          status: 'idle',
          targetFormat,
          targetQuality: quality,
        };

        img.onload = () => {
          setImages((prev) =>
            prev.map((i) =>
              i.id === id
                ? { ...i, originalWidth: img.width, originalHeight: img.height, targetWidth: img.width, targetHeight: img.height }
                : i
            )
          );
        };

        return initialImage;
      });

    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    const target = images.find((img) => img.id === id);
    if (target) {
      URL.revokeObjectURL(target.previewUrl);
    }
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const clearAll = () => {
    images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
    setImages([]);
  };

  const processImage = async (image: ProcessingImage): Promise<ProcessingImage> => {
    return new Promise((resolve) => {
      setImages((prev) =>
        prev.map((img) => (img.id === image.id ? { ...img, status: 'processing' } : img))
      );

      const img = new Image();
      img.src = image.previewUrl;

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            throw new Error('Canvas 2D context unavailable');
          }

          const width = image.targetWidth || img.width;
          const height = image.targetHeight || img.height;
          canvas.width = width;
          canvas.height = height;

          if (targetFormat === 'jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, width, height);
          }

          ctx.drawImage(img, 0, 0, width, height);

          const mimeTypes = {
            png: 'image/png',
            jpeg: 'image/jpeg',
            webp: 'image/webp',
          };

          const mimeType = mimeTypes[targetFormat];

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve({
                  ...image,
                  status: 'completed',
                  convertedBlob: blob,
                  convertedSize: blob.size,
                  convertedWidth: width,
                  convertedHeight: height,
                });
              } else {
                resolve({
                  ...image,
                  status: 'failed',
                  error: 'Empty binary compilation blob',
                });
              }
            },
            mimeType,
            targetFormat === 'png' ? undefined : quality
          );
        } catch (error) {
          resolve({
            ...image,
            status: 'failed',
            error: error instanceof Error ? error.message : 'Render bounds fault',
          });
        }
      };

      img.onerror = () => {
        resolve({
          ...image,
          status: 'failed',
          error: 'Corrupted source',
        });
      };
    });
  };

  const processAll = async () => {
    if (images.length === 0) return;
    setIsProcessingAll(true);

    const updatedImages: ProcessingImage[] = [];
    for (const img of images) {
      const currentImageConfig: ProcessingImage = {
        ...img,
        targetFormat,
        targetQuality: quality,
      };
      const result = await processImage(currentImageConfig);
      updatedImages.push(result);
      
      setImages((prev) => prev.map((item) => (item.id === img.id ? result : item)));
    }

    setIsProcessingAll(false);
  };

  const downloadAsZip = async () => {
    const completed = images.filter((img) => img.status === 'completed' && img.convertedBlob);
    if (completed.length === 0) return;

    const zip = new JSZip();
    completed.forEach((img) => {
      const extension = img.targetFormat;
      const baseName = img.name.substring(0, img.name.lastIndexOf('.')) || img.name;
      const cleanName = `${baseName}_optipic.${extension}`;
      if (img.convertedBlob) {
        zip.file(cleanName, img.convertedBlob);
      }
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `optipic_batch_export_${new Date().getTime()}.zip`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const downloadOne = (img: ProcessingImage) => {
    if (!img.convertedBlob) return;
    const extension = img.targetFormat;
    const baseName = img.name.substring(0, img.name.lastIndexOf('.')) || img.name;
    const link = document.createElement('a');
    link.href = URL.createObjectURL(img.convertedBlob);
    link.download = `${baseName}_optipic.${extension}`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const getSavings = (original: number, converted?: number) => {
    if (!converted) return '';
    const diff = original - converted;
    const percentage = ((diff / original) * 100).toFixed(0);
    const floatPercent = parseFloat(percentage);
    if (floatPercent > 0) {
      return `-${percentage}%`;
    } else if (floatPercent < 0) {
      return `+${Math.abs(floatPercent)}%`;
    }
    return '0%';
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6" id="image-converter-container">
      {/* Settings Grid Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Dropzone Area (col-span-2) */}
        <div className="md:col-span-2 space-y-4">
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-white/15 hover:border-blue-500 bg-[#111111] hover:bg-[#151515] rounded-3xl p-8 md:p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[220px] group relative overflow-hidden"
            id="converter-drag-dropzone"
          >
            {/* Background design accents */}
            <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />

            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
              id="converter-file-input"
            />
            <div className="w-14 h-14 rounded-full bg-white/5 group-hover:bg-blue-600/10 group-hover:border-blue-500/50 flex items-center justify-center border border-white/10 transition-all mb-4">
              <Upload className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
            </div>
            
            <h3 className="text-lg font-black uppercase tracking-tight text-white font-display">
              Drag & Drop your images here
            </h3>
            <p className="text-[11px] text-white/40 max-w-sm mt-1 mb-4 uppercase tracking-wide font-mono">
              Supports Bulk JPG, PNG, WebP, GIF, or SVG formats. 100% Client-Side.
            </p>
            <span className="bg-white/10 hover:bg-white/20 group-hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
              Choose Files Offline
            </span>
          </div>
        </div>

        {/* Output Preferences */}
        <div className="bg-[#111111] rounded-3xl border border-white/5 p-6 flex flex-col justify-between space-y-6">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4 flex items-center gap-1.5 font-display">
              <Layers className="w-4 h-4 text-emerald-400" />
              BATCH PERFORMANCE
            </h3>

            {/* Target Select */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-[9px] text-[#8C8C8C] uppercase font-bold tracking-widest font-mono">Convert Target Format</label>
                <div className="grid grid-cols-3 gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                  {(['webp', 'png', 'jpeg'] as const).map((fmt) => (
                    <button
                      key={fmt}
                      id={`target-fmt-${fmt}`}
                      onClick={() => setTargetFormat(fmt)}
                      className={`py-2 text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all cursor-pointer ${
                        targetFormat === fmt
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality level slider */}
              {targetFormat !== 'png' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-mono tracking-widest uppercase">
                    <span className="text-[#8C8C8C] font-bold">COMPRESSION QUALITY</span>
                    <span className="font-bold text-blue-400">{(quality * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={quality}
                    id="converter-quality-slider"
                    onChange={(e) => setQuality(Number(e.target.value))}
                    className="w-full accent-blue-500 cursor-pointer h-1.5 bg-white/10 rounded-lg appearance-none"
                  />
                  <span className="text-[10px] text-white/30 block leading-relaxed font-mono uppercase text-right">
                    80-85% is sweet-spot.
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 flex flex-col gap-2.5">
            <button
              onClick={processAll}
              disabled={images.length === 0 || isProcessingAll}
              id="btn-convert-all"
              type="button"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-white/5 text-white disabled:text-white/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isProcessingAll ? 'animate-spin' : ''}`} />
              {isProcessingAll ? 'Optimizing Bulk Pixels...' : `Convert All (${images.length} files)`}
            </button>
            
            {images.some((i) => i.status === 'completed') && (
              <button
                onClick={downloadAsZip}
                id="btn-download-zip"
                type="button"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FolderArchive className="w-4 h-4" />
                Download Batch (ZIP)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Files Table List container */}
      {images.length > 0 && (
        <div className="bg-[#111111] border border-white/5 rounded-3xl p-6 shadow-md" id="converter-files-table-container">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/5">
            <div>
              <span className="text-[10px] font-mono uppercase text-white/50 tracking-wider">[{images.length} files imported]</span>
            </div>
            <button
              onClick={clearAll}
              id="btn-clear-all"
              className="text-[11px] font-bold uppercase tracking-widest text-[#FF5F5F] hover:text-[#FF2B2B] flex items-center gap-1.5 bg-transparent border-0 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove All
            </button>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {images.map((img) => (
              <div
                key={img.id}
                id={`file-row-${img.id}`}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-[#151515] hover:bg-[#1a1a1a] border border-white/5 rounded-2xl transition-all"
              >
                {/* Thumbnails */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#222] border border-white/10 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={img.previewUrl}
                      alt={img.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate max-w-[200px] md:max-w-xs">{img.name}</span>
                    <span className="text-[10px] text-white/40 block font-mono">
                      {img.originalWidth > 0 ? `${img.originalWidth}x${img.originalHeight}px` : 'Resolving Dimensions...'} • {formatSize(img.originalSize)}
                    </span>
                  </div>
                </div>

                {/* Operations & actions panel */}
                <div className="flex flex-wrap items-center gap-4 md:ml-auto">
                  
                  {img.status === 'idle' && (
                    <span className="text-[9px] font-bold uppercase font-mono tracking-widest text-white/40 bg-white/5 px-2.5 py-1 rounded">
                      Ready to process
                    </span>
                  )}
                  {img.status === 'processing' && (
                    <span className="text-[9px] font-bold uppercase font-mono tracking-widest text-blue-400 bg-blue-950/40 border border-blue-900/30 px-2.5 py-1 rounded flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Compressing...
                    </span>
                  )}
                  {img.status === 'failed' && (
                    <span className="text-[9px] font-bold uppercase font-mono tracking-widest text-rose-400 bg-rose-950/40 border border-rose-900/30 px-2.5 py-1 rounded flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {img.error || 'Failed'}
                    </span>
                  )}
                  {img.status === 'completed' && img.convertedSize && (
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold uppercase font-mono tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-900/30 px-2.5 py-1 rounded flex items-center gap-0.5">
                        <Check className="w-3.5 h-3.5" />
                        Done {getSavings(img.originalSize, img.convertedSize)}
                      </span>
                      <span className="text-[10px] text-white/50 font-mono">
                        {formatSize(img.convertedSize)}
                      </span>
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex items-center gap-1.5">
                    {img.status === 'completed' ? (
                      <button
                        onClick={() => downloadOne(img)}
                        id={`btn-dl-individual-${img.id}`}
                        type="button"
                        className="p-2 bg-emerald-950 hover:bg-emerald-900 border border-emerald-800/30 rounded-xl text-emerald-400 transition-all cursor-pointer"
                        title="Download"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={async () => {
                          const conf = { ...img, targetFormat, targetQuality: quality };
                          const res = await processImage(conf);
                          setImages((prev) => prev.map((item) => (item.id === img.id ? res : item)));
                        }}
                        disabled={isProcessingAll}
                        id={`btn-convert-individual-${img.id}`}
                        type="button"
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 cursor-pointer"
                      >
                        Convert
                        <ArrowRight className="w-3 h-3 text-blue-400" />
                      </button>
                    )}

                    <button
                      onClick={() => removeImage(img.id)}
                      id={`btn-remove-${img.id}`}
                      type="button"
                      className="p-2 hover:bg-rose-950/40 rounded-xl text-white/30 hover:text-rose-400 transition-all cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Embedded Banner Ad slot inside Converter */}
      <AdSensePlaceholder type="native" className="mt-4" />
    </div>
  );
}
