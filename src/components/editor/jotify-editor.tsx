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
  MicOff,
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
  X
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

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast({
      title: isRecording ? "Recording Stopped" : "Recording Started",
      description: isRecording ? "Transcription (simulated) has stopped." : "Transcribing audio (simulated)...",
    });
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
      toast({ title: "Image(s) added", description: `${newImages.length} image(s) ready to be placed.` });
    }
  };

  const removeImage = (id: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== id));
    const imageToRemove = uploadedImages.find(img => img.id === id);
    if (imageToRemove) URL.revokeObjectURL(imageToRemove.url); // Clean up object URL
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
    { icon: Palette, action: () => console.log("Color Picker"), label: "Text Color" },
    { icon: CaseSensitive, action: () => console.log("Font Size"), label: "Font Size" },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full max-h-[calc(100vh-10rem)]">
      <Card className="flex-grow flex flex-col h-full shadow-lg">
        <CardHeader className="border-b p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-headline">
              {noteId ? `Editing Note ${noteId}` : "New Note"}
            </CardTitle>
            <Button onClick={toggleRecording} variant={isRecording ? "destructive" : "outline"} size="sm">
              {isRecording ? <MicOff className="mr-2 h-4 w-4" /> : <Mic className="mr-2 h-4 w-4" />}
              {isRecording ? 'Stop Transcription' : 'Start Transcription'}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow flex flex-col">
          <div className="p-2 border-b flex flex-wrap gap-1 items-center bg-muted/50">
            {formattingTools.map(tool => (
              <Button key={tool.label} variant="ghost" size="icon" onClick={tool.action} aria-label={tool.label} title={tool.label} className="h-8 w-8">
                <tool.icon className="h-4 w-4" />
              </Button>
            ))}
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} aria-label="Upload Image" title="Upload Image" className="h-8 w-8">
              <ImagePlus className="h-4 w-4" />
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              multiple
            />
          </div>
          <ScrollArea className="flex-grow p-1"> {/* Reduced padding for scroll area */}
            <Textarea
              placeholder="Start typing your notes here or begin transcription..."
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              className="min-h-[300px] lg:min-h-[400px] w-full border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 p-3 text-base resize-none"
              aria-label="Note content"
            />
          </ScrollArea>
          {uploadedImages.length > 0 && (
            <div className="p-3 border-t bg-muted/30">
              <h4 className="text-sm font-medium mb-2">Attached Images:</h4>
              <ScrollArea className="h-28">
                <div className="flex gap-2 pb-2">
                {uploadedImages.map((image) => (
                  <div key={image.id} className="relative group w-24 h-24 flex-shrink-0 border rounded-md overflow-hidden">
                    <Image src={image.url} alt={image.name} layout="fill" objectFit="cover" />
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(image.id)}
                      aria-label={`Remove ${image.name}`}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate" title={image.name}>
                      {image.name}
                    </div>
                  </div>
                ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-sm text-muted-foreground">{noteContent.split(/\s+/).filter(Boolean).length} words</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPdf}>
              <FileDown className="mr-2 h-4 w-4" /> Export PDF
            </Button>
            <Button size="sm" onClick={handleSummarize} disabled={isSummarizing}>
              {isSummarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              AI Summary
            </Button>
          </div>
        </CardFooter>
      </Card>

      {(formState.summary || isSummarizing) && (
        <Card className="lg:w-1/3 lg:max-w-md flex flex-col h-full shadow-lg">
          <CardHeader className="border-b p-4">
            <CardTitle className="text-xl font-headline flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-primary" /> AI Summary
            </CardTitle>
          </CardHeader>
          <ScrollArea className="flex-grow">
            <CardContent className="p-4">
              {isSummarizing && !formState.summary && (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
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
            </CardContent>
          </ScrollArea>
        </Card>
      )}
    </div>
  );
}
