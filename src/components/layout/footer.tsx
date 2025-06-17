import Link from 'next/link';
import Container from './container';
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/30 border-t border-border mt-auto py-8 text-muted-foreground">
      <Container>
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="text-sm md:col-span-1">
            <p>&copy; {currentYear} FlickFetch. All rights reserved.</p>
            <p>Powered by the YTS API.</p>
          </div>

          <nav className="md:col-span-1 md:justify-self-center">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-start">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex gap-4 justify-center md:justify-end md:col-span-1">
            <Link href="#" aria-label="FlickFetch on Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="FlickFetch on GitHub" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Contact FlickFetch" className="text-muted-foreground hover:text-primary transition-colors">
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
