
"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useFormState } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { summarizeNoteContent } from '@/lib/actions/noteActions';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import {
  Mic,
  Square, // For stop button
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Palette,
  CaseSensitive,
  ImagePlus,
  FileDown,
  Sparkles,
  Loader2,
  Paperclip,
  X,
  RotateCcw, // For restart
} from 'lucide-react';

const initialFormState = {
  message: "",
  summary: null,
  errors: null,
};

type ImageFile = {
  id: string;
  url: string;
  name: string;
};

export function JotifyEditor({ noteId }: { noteId?: string }) {
  const [noteContent, setNoteContent] = useState<string>(noteId ? `Content for note ${noteId}` : "");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [uploadedImages, setUploadedImages] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const [formState, formAction] = useFormState(summarizeNoteContent, initialFormState);
  const [isSummarizing, setIsSummarizing] = useState(false);

  // State for mock timer
  const [timer, setTimer] = useState("00:00");
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  // State for client-side waveform rendering
  const [canRenderWaveform, setCanRenderWaveform] = useState(false);
  useEffect(() => {
    setCanRenderWaveform(true);
  }, []);

  useEffect(() => {
    if (formState.message && formState.message !== "Validation failed") {
      if (formState.summary) {
        toast({ title: "Summary Ready", description: "AI summary has been generated." });
      } else if (formState.errors) {
        toast({ variant: "destructive", title: "Error", description: formState.message });
      }
    }
    setIsSummarizing(false);
  }, [formState, toast]);

  useEffect(() => {
    if (isRecording) {
      timerIntervalRef.current = setInterval(() => {
        setSecondsElapsed(s => {
          const currentSeconds = s + 1;
          const mins = Math.floor(currentSeconds / 60).toString().padStart(2, '0');
          const secs = (currentSeconds % 60).toString().padStart(2, '0');
          setTimer(`${mins}:${secs}`);
          // Simulate transcription
          if (currentSeconds > 0 && currentSeconds % 2 === 0) { // Add word every 2 seconds
              setNoteContent(prev => prev + `text${currentSeconds} `);
          }
          return currentSeconds;
        });
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRecording, setNoteContent]);


  const handleSummarize = () => {
    if (noteContent.length < 10) {
      toast({ variant: "destructive", title: "Cannot Summarize", description: "Please write more content before summarizing." });
      return;
    }
    setIsSummarizing(true);
    const formData = new FormData();
    formData.append('notes', noteContent);
    formAction(formData);
  };

  const mainRecordAction = () => {
    const newRecordingState = !isRecording;
    setIsRecording(newRecordingState);
    if (newRecordingState) { // Just started recording
        setTimer("00:00"); 
        setSecondsElapsed(0);
        // Decide if notes should be cleared or appended. Current: append.
        // setNoteContent(""); // To clear notes on new recording
    }
    toast({
      title: newRecordingState ? "Recording Started" : "Recording Stopped",
      description: newRecordingState ? "Transcribing audio (simulated)..." : "Transcription (simulated) has stopped.",
    });
  };

  const handleRestartRecording = () => {
    setNoteContent(""); 
    setTimer("00:00");
    setSecondsElapsed(0);
    if (!isRecording) { 
        setIsRecording(true);
    } else {
      // If already recording, effectively just reset timer and content
      toast({ title: "Recording Restarted", description: "Content cleared, timer reset."});
    }
  };

  const handleCancelRecording = () => {
    if (isRecording) {
        setIsRecording(false); 
    }
    setNoteContent(""); 
    setTimer("00:00");
    setSecondsElapsed(0);
    toast({ title: "Recording Canceled", description: "Content cleared."});
  };


  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => ({
        id: crypto.randomUUID(),
        url: URL.createObjectURL(file),
        name: file.name,
      }));
      setUploadedImages(prev => [...prev, ...newImages]);
      toast({ title: "Image(s) added", description: `${newImages.length} image(s) ready.` });
    }
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
    const imageToRemove = uploadedImages.find(img => img.id === id);
    if (imageToRemove) URL.revokeObjectURL(imageToRemove.url);
  };
  
  const handleExportPdf = () => {
    toast({ title: "PDF Export", description: "PDF export functionality coming soon!" });
  };

  const formattingTools = [
    { icon: Bold, action: () => console.log("Bold"), label: "Bold" },
    { icon: Italic, action: () => console.log("Italic"), label: "Italic" },
    { icon: Underline, action: () => console.log("Underline"), label: "Underline" },
    { icon: List, action: () => console.log("Bullet List"), label: "Bullet List" },
    { icon: ListOrdered, action: () => console.log("Numbered List"), label: "Numbered List" },
  ];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Recording Interface */}
      <div className="bg-primary text-primary-foreground p-4 sm:p-6 rounded-xl shadow-xl flex flex-col items-center">
        <div className="text-5xl font-mono mb-3 tracking-wider tabular-nums">{timer}</div>
        
        <div className="w-full max-w-md h-20 flex items-center justify-center mb-3 overflow-hidden">
          {canRenderWaveform && isRecording && (
            <div className="flex items-end justify-center h-full w-full space-x-px animate-pulse">
              {[...Array(40)].map((_, i) => (
                <div key={i} className="w-1.5 bg-primary-foreground/70 rounded-t-full" style={{ height: `${Math.random() * 60 + 30}%` }}></div>
              ))}
            </div>
          )}
          {canRenderWaveform && !isRecording && (
            <div className="flex items-end justify-center h-full w-full space-x-px opacity-50">
               {[...Array(40)].map((_, i) => (
                <div key={i} className="w-1.5 bg-primary-foreground/50 rounded-t-full" style={{ height: `30%` }}></div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-around w-full max-w-xs">
          <Button variant="ghost" size="icon" onClick={handleRestartRecording} className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full h-14 w-14" aria-label="Restart Recording">
            <RotateCcw size={24} />
          </Button>
          <Button 
            onClick={mainRecordAction} 
            className={`rounded-full h-20 w-20 shadow-lg transform hover:scale-105 transition-all flex items-center justify-center
                        ${isRecording ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : 'bg-white text-primary hover:bg-slate-100'}`}
            aria-label={isRecording ? "Stop Recording" : "Start Recording"}
          >
            {isRecording ? <Square size={32} /> : <Mic size={32} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCancelRecording} className="text-primary-foreground hover:bg-primary-foreground/10 rounded-full h-14 w-14" aria-label="Cancel Recording">
            <X size={24} />
          </Button>
        </div>
        {isRecording && <p className="mt-3 text-xs text-primary-foreground/80">Please keep the screen on while speaking</p>}
      </div>

      {/* Editor and Summary Section */}
      <div className="flex flex-col lg:flex-row gap-4 flex-grow min-h-0">
        <Card className="flex-grow flex flex-col shadow-lg">
          <ScrollArea className="flex-grow p-1">
            <Textarea
              placeholder="Your transcribed notes will appear here..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[200px] w-full border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 p-3 text-base resize-none"
              aria-label="Note content"
            />
          </ScrollArea>
          <CardFooter className="p-3 border-t flex flex-col sm:flex-row items-center gap-2 bg-muted/30">
            <div className="flex flex-wrap gap-1 items-center">
              {formattingTools.map(tool => (
                <Button key={tool.label} variant="ghost" size="icon" onClick={tool.action} aria-label={tool.label} title={tool.label} className="h-8 w-8 text-muted-foreground hover:text-foreground">
                  <tool.icon className="h-4 w-4" />
                </Button>
              ))}
              <Separator orientation="vertical" className="h-6 mx-1" />
              <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} aria-label="Upload Image" title="Upload Image" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                <ImagePlus className="h-4 w-4" />
              </Button>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" multiple />
            </div>
            <p className="text-sm text-muted-foreground sm:ml-auto mt-2 sm:mt-0">{noteContent.split(/\s+/).filter(Boolean).length} words</p>
          </CardFooter>
        </Card>

        {(formState.summary || isSummarizing || uploadedImages.length > 0) && (
          <Card className="lg:w-1/3 lg:max-w-md flex flex-col shadow-lg max-h-[50vh] lg:max-h-none">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg font-headline flex items-center">
                { (formState.summary || isSummarizing) ? 
                  <><Sparkles className="mr-2 h-5 w-5 text-primary" /> AI Summary</>
                  : <><Paperclip className="mr-2 h-5 w-5 text-primary" /> Attachments</>
                }
              </CardTitle>
            </CardHeader>
            <ScrollArea className="flex-grow">
              <CardContent className="p-4 space-y-4">
                {isSummarizing && !formState.summary && (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <p>Generating summary...</p>
                  </div>
                )}
                {formState.summary && (
                  <p className="text-sm whitespace-pre-wrap">{formState.summary}</p>
                )}
                {formState.errors?.notes && (
                  <p className="text-sm text-destructive">{formState.errors.notes.join(', ')}</p>
                )}
                {uploadedImages.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Attached Images:</h4>
                    <div className="flex gap-2 pb-2 overflow-x-auto">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group w-20 h-20 flex-shrink-0 border rounded-md overflow-hidden">
                        <Image src={image.url} alt={image.name} layout="fill" objectFit="cover" />
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          className="absolute top-0.5 right-0.5 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(image.id)}
                          aria-label={`Remove ${image.name}`}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-0.5 truncate" title={image.name}>
                          {image.name}
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </ScrollArea>
          </Card>
        )}
      </div>

      <div className="flex flex-col sm:flex-row justify-end items-center gap-2 p-1 mt-auto">
          <Button variant="outline" size="sm" onClick={handleExportPdf}>
              <FileDown className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button size="sm" onClick={handleSummarize} disabled={isSummarizing || noteContent.length < 10}>
              {isSummarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              AI Summary
          </Button>
      </div>
    </div>
  );
}

