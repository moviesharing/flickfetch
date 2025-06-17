'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { generateSeoMovieDescription, GenerateSeoMovieDescriptionInput } from '@/ai/flows/seo-description-generator';
import { Sparkles, Copy } from 'lucide-react';
import type { Movie } from '@/types/yts';

const seoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  genre: z.string().min(1, "Genre is required"),
  actors: z.string().min(1, "Actors are required"),
  plotSummary: z.string().min(1, "Plot summary is required"),
});

type SeoFormValues = z.infer<typeof seoSchema>;

interface SeoOptimizerProps {
  movie: Movie;
}

export default function SeoOptimizer({ movie }: SeoOptimizerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [seoDescription, setSeoDescription] = useState('');
  const { toast } = useToast();

  const defaultActors = movie.cast?.map(actor => actor.name).slice(0, 5).join(', ') || '';

  const form = useForm<SeoFormValues>({
    resolver: zodResolver(seoSchema),
    defaultValues: {
      title: movie.title_long || '',
      genre: movie.genres?.join(', ') || '',
      actors: defaultActors,
      plotSummary: movie.description_full || movie.summary || '',
    },
  });

  const onSubmit: SubmitHandler<SeoFormValues> = async (data) => {
    setIsLoading(true);
    setProgress(0);
    setSeoDescription('');

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const input: GenerateSeoMovieDescriptionInput = {
        title: data.title,
        genre: data.genre,
        actors: data.actors,
        plotSummary: data.plotSummary,
      };
      const result = await generateSeoMovieDescription(input);
      clearInterval(interval);
      setProgress(100);
      setSeoDescription(result.seoDescription);
      toast({
        title: 'SEO Description Generated!',
        description: 'The AI has crafted an SEO-friendly description for your movie.',
      });
    } catch (error) {
      clearInterval(interval);
      setProgress(0);
      console.error('Error generating SEO description:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate SEO description. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyDescription = () => {
    if (seoDescription) {
      navigator.clipboard.writeText(seoDescription)
        .then(() => {
          toast({ title: 'Copied to clipboard!' });
        })
        .catch(err => {
          console.error('Failed to copy description: ', err);
          toast({ title: 'Error copying', variant: 'destructive' });
        });
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <Sparkles className="h-6 w-6 text-primary" />
          AI SEO Description Generator
        </CardTitle>
        <CardDescription>
          Automatically generate an SEO-friendly description for this movie.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Movie Title</Label>
            <Input id="title" {...form.register('title')} className="mt-1" />
            {form.formState.errors.title && <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>}
          </div>
          <div>
            <Label htmlFor="genre">Genre(s)</Label>
            <Input id="genre" {...form.register('genre')} placeholder="e.g., Action, Sci-Fi, Thriller" className="mt-1" />
            {form.formState.errors.genre && <p className="text-sm text-destructive mt-1">{form.formState.errors.genre.message}</p>}
          </div>
          <div>
            <Label htmlFor="actors">Main Actors</Label>
            <Input id="actors" {...form.register('actors')} placeholder="e.g., Actor One, Actor Two" className="mt-1" />
            {form.formState.errors.actors && <p className="text-sm text-destructive mt-1">{form.formState.errors.actors.message}</p>}
          </div>
          <div>
            <Label htmlFor="plotSummary">Plot Summary</Label>
            <Textarea id="plotSummary" {...form.register('plotSummary')} rows={5} className="mt-1" />
            {form.formState.errors.plotSummary && <p className="text-sm text-destructive mt-1">{form.formState.errors.plotSummary.message}</p>}
          </div>

          {isLoading && (
            <div className="space-y-2">
              <Label>Generating...</Label>
              <Progress value={progress} className="w-full" />
            </div>
          )}

          {seoDescription && !isLoading && (
            <div className="space-y-2">
              <Label>Generated SEO Description:</Label>
              <div className="p-3 border rounded-md bg-muted/50 relative">
                <p className="text-sm text-foreground">{seoDescription}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-7 w-7"
                  onClick={handleCopyDescription}
                  title="Copy Description"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? 'Generating...' : 'Generate Description'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
