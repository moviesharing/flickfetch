import Link from 'next/link';
import { Film } from 'lucide-react';
import Container from './container';

export default function Header() {
  return (
    <header className="bg-card/50 backdrop-blur-md sticky top-0 z-50 py-4 border-b border-border">
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary-foreground hover:text-accent transition-colors">
          <Film className="h-8 w-8 text-primary" />
          <span className="font-headline">FlickFetch</span>
        </Link>
        {/* Navigation links can be added here if needed */}
      </Container>
    </header>
  );
}
