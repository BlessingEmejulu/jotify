import { JotifyEditor } from '@/components/editor/jotify-editor';

type NotePageProps = {
  params: {
    noteId: string;
  };
};

export default function NotePage({ params }: NotePageProps) {
  return <JotifyEditor noteId={params.noteId} />;
}
