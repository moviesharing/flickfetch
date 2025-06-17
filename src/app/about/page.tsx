
import type { Metadata } from 'next';
import Container from '@/components/layout/container';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'About FlickFetch',
  description: 'Learn more about FlickFetch, your ultimate movie discovery tool.',
};

export default function AboutPage() {
  return (
    <Container className="py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 font-headline">About FlickFetch</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Welcome to FlickFetch, your ultimate companion for discovering movies. We aim to provide a seamless and enjoyable experience for finding your next favorite film.
        </p>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Features</h2>
          <ul className="list-disc list-inside space-y-3 text-foreground">
            <li>
              <strong>Intuitive Search:</strong> Quickly find movies by title, actor, or genre. Our robust search leverages the extensive YTS.mx API.
            </li>
            <li>
              <strong>Detailed Movie Information:</strong> Get comprehensive details including ratings, synopsis, cast, runtime, trailers, and available torrents.
            </li>
            <li>
              <strong>Torrent Availability:</strong> See available torrents for movies, complete with quality, size, seeds, and peers. Generate magnet links with a single click.
            </li>
            <li>
              <strong>Movie Suggestions:</strong> Discover new films based on movies you're interested in, powered by smart suggestions from the YTS.mx API.
            </li>
          </ul>
        </section>

        <Separator className="my-8" />

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-foreground leading-relaxed">
            FlickFetch is designed to simplify the movie discovery process. We strive to offer a user-friendly platform that aggregates movie data efficiently, helping you explore the vast world of cinema.
          </p>
        </section>
        
        <Separator className="my-8" />

        <section>
          <h2 className="text-2xl font-semibold mb-4">Important Note on Content</h2>
          <p className="text-foreground leading-relaxed mb-2">
            All movie information, including details and torrent links, is sourced directly from the YTS.mx API. FlickFetch acts as a discovery tool and does not host any files on its servers.
          </p>
          <p className="text-foreground leading-relaxed">
            Users are responsible for understanding and complying with all applicable copyright laws and regulations in their respective countries or regions when accessing or downloading content.
          </p>
        </section>
      </div>
    </Container>
  );
}
