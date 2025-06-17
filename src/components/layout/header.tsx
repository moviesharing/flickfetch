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
        <div>
          <a
            href="https://aads.com/campaigns/new/?source_id=2399071&source_type=ad_unit&partner=2399071"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            Advertise here
          </a>
        </div>
      </Container>
    </header>
  );
}
