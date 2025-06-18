
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JotifyLogo } from '@/components/icons/logo';
import { PATHS } from '@/lib/constants';
import { Mic, Sparkles, FileText, ImagePlus, ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-secondary/30">
      {/* Header */}
      <header className="py-4 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href={PATHS.HOME} className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
            <JotifyLogo size={32} />
            <span className="text-2xl font-bold font-headline">Jotify</span>
          </Link>
          <div className="space-x-2">
            <Button asChild variant="ghost">
              <Link href={PATHS.LOGIN}>Login</Link>
            </Button>
            <Button asChild>
              <Link href={PATHS.SIGNUP}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-b from-background via-secondary/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground font-headline mb-6">
              Capture Every Word, <span className="text-primary">Unlock Every Insight.</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Jotify transcribes your lectures live and uses AI to summarize key points, so you never miss a detail. Focus, learn, and excel.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 group shadow-md hover:shadow-lg transition-shadow">
              <Link href={PATHS.SIGNUP}>
                Get Started Free
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <div className="mt-12 lg:mt-16">
              <Image 
                src="https://placehold.co/800x450.png" 
                alt="Jotify app interface showing notes and transcription" 
                width={800} 
                height={450} 
                className="rounded-lg shadow-2xl mx-auto border border-border"
                data-ai-hint="app interface notes" 
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-foreground font-headline mb-4">
              Why Jotify?
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 sm:mb-16 max-w-xl mx-auto">
              Streamline your studies with powerful tools designed for students.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {/* Feature 1 */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm border-border/70">
                <CardHeader className="items-center pt-6">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-headline text-center">Live Transcription</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm px-6 pb-6">
                  Focus on the lecture, not on frantic note-taking. Get real-time audio-to-text conversion.
                </CardContent>
              </Card>
              {/* Feature 2 */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm border-border/70">
                <CardHeader className="items-center pt-6">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-headline text-center">AI-Powered Summaries</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm px-6 pb-6">
                  Instantly generate concise summaries, highlighting key concepts and action items.
                </CardContent>
              </Card>
              {/* Feature 3 */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm border-border/70">
                <CardHeader className="items-center pt-6">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-headline text-center">Organized Notes</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm px-6 pb-6">
                  Keep all your notes neatly organized, easily searchable, and accessible anywhere.
                </CardContent>
              </Card>
              {/* Feature 4 */}
              <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm border-border/70">
                <CardHeader className="items-center pt-6">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <ImagePlus className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl font-headline text-center">Attach Media</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground text-sm px-6 pb-6">
                  Enhance your notes by easily attaching images, diagrams, and other relevant files.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-t from-background via-secondary/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground font-headline mb-6">
              Ready to Transform Your Note-Taking?
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
              Join thousands of students who are already studying smarter with Jotify.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 group shadow-md hover:shadow-lg transition-shadow">
              <Link href={PATHS.SIGNUP}>
                Sign Up Now - It&apos;s Free!
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border/50 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Jotify. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
