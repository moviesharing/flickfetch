import Link from 'next/link';
import Container from './container';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/30 border-t border-border mt-auto py-8 text-muted-foreground">
      <Container>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="text-sm md:col-span-1">
            <p>&copy; {currentYear} FlickFetch. All rights reserved.</p>
            <p>Powered by the YTS API.</p>
          </div>

          <nav className="md:col-span-1 md:justify-self-end">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 justify-center md:justify-end">
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
        </div>
      </Container>
    </footer>
  );
}
