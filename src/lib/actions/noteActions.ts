"use server";

import { summarizeNotes, type SummarizeNotesInput } from '@/ai/flows/summarize-notes';
import { z } from 'zod';

const summarizeActionSchema = z.object({
  notes: z.string().min(10, { message: "Notes must be at least 10 characters long to summarize." }),
});

export async function summarizeNoteContent(prevState: any, formData: FormData) {
  const rawNotes = formData.get('notes');
  
  const validationResult = summarizeActionSchema.safeParse({ notes: rawNotes });

  if (!validationResult.success) {
    return {
      message: "Validation failed",
      errors: validationResult.error.flatten().fieldErrors,
      summary: null,
    };
  }
  
  const input: SummarizeNotesInput = { notes: validationResult.data.notes };

  try {
    const result = await summarizeNotes(input);
    return { message: "Summary generated successfully.", summary: result.summary, errors: null };
  } catch (error) {
    console.error("Error summarizing notes:", error);
    return { message: "Failed to generate summary.", summary: null, errors: { notes: ["AI service currently unavailable."] } };
  }
}
