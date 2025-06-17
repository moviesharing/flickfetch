'use server';

/**
 * @fileOverview AI-powered tool that automatically generates SEO-friendly movie descriptions.
 *
 * - generateSeoMovieDescription - A function that handles the generation of SEO movie descriptions.
 * - GenerateSeoMovieDescriptionInput - The input type for the generateSeoMovieDescription function.
 * - GenerateSeoMovieDescriptionOutput - The return type for the generateSeoMovieDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSeoMovieDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the movie.'),
  genre: z.string().describe('The genre of the movie.'),
  actors: z.string().describe('The main actors in the movie.'),
  plotSummary: z.string().describe('A brief summary of the movie plot.'),
});
export type GenerateSeoMovieDescriptionInput = z.infer<typeof GenerateSeoMovieDescriptionInputSchema>;

const GenerateSeoMovieDescriptionOutputSchema = z.object({
  seoDescription: z.string().describe('An SEO-friendly description of the movie.'),
});
export type GenerateSeoMovieDescriptionOutput = z.infer<typeof GenerateSeoMovieDescriptionOutputSchema>;

export async function generateSeoMovieDescription(
  input: GenerateSeoMovieDescriptionInput
): Promise<GenerateSeoMovieDescriptionOutput> {
  return generateSeoMovieDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSeoMovieDescriptionPrompt',
  input: {schema: GenerateSeoMovieDescriptionInputSchema},
  output: {schema: GenerateSeoMovieDescriptionOutputSchema},
  prompt: `You are an SEO expert specializing in writing movie descriptions.

  Generate a compelling and SEO-friendly movie description based on the following information:

  Title: {{{title}}}
  Genre: {{{genre}}}
  Actors: {{{actors}}}
  Plot Summary: {{{plotSummary}}}

  The description should be approximately 150-160 characters long and optimized for search engines.
  It must include the title, genre and main actors of the movie.
  Focus on attracting visitors looking for information and where to watch this movie.
  Use keywords that are relevant to the movie.
  `,
});

const generateSeoMovieDescriptionFlow = ai.defineFlow(
  {
    name: 'generateSeoMovieDescriptionFlow',
    inputSchema: GenerateSeoMovieDescriptionInputSchema,
    outputSchema: GenerateSeoMovieDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
