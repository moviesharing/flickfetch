
import type { Metadata } from 'next';
import Container from '@/components/layout/container';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Terms of Service - FlickFetch',
  description: 'Read the FlickFetch Terms of Service.',
};

export default function TermsOfServicePage() {
  return (
    <Container className="py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 font-headline">Terms of Service</h1>
        {/* Last Updated date removed to allow metadata export from Server Component */}

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-foreground leading-relaxed">
            By accessing or using FlickFetch (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to all of these Terms, do not use the Service.
          </p>
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. Description of Service</h2>
          <p className="text-foreground leading-relaxed">
            FlickFetch is a movie discovery tool that provides users with information about movies, including details, ratings, and torrent availability, sourced from the YTS.mx API. FlickFetch does not host any movie files or torrents itself.
          </p>
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. User Conduct and Responsibilities</h2>
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>You agree to use the Service only for lawful purposes and in accordance with these Terms.</li>
            <li>
              You are solely responsible for ensuring that your use of the Service, including accessing or using torrent links, complies with all applicable laws in your jurisdiction, including copyright and intellectual property laws.
            </li>
            <li>You agree not to use the Service in any way that could damage, disable, overburden, or impair the Service or interfere with any other party's use of the Service.</li>
             <li>You agree not to attempt to gain unauthorized access to any part of the Service or its related systems or networks.</li>
          </ul>
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Intellectual Property</h2>
          <p className="text-foreground leading-relaxed mb-2">
            The Service and its original content (excluding content sourced from YTS.mx), features, and functionality are and will remain the exclusive property of FlickFetch and its licensors.
          </p>
          <p className="text-foreground leading-relaxed">
            All movie titles, cover art, synopses, and other related media are the property of their respective copyright holders. FlickFetch uses this content as provided by the YTS.mx API for informational and discovery purposes only.
          </p>
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Disclaimers</h2>
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>
              <strong>No File Hosting:</strong> FlickFetch does not host, store, or distribute any movie files or torrents. We provide links to torrents available on YTS.mx. We are not responsible for the content, legality, or availability of these torrents.
            </li>
            <li>
              <strong>Content Accuracy:</strong> Movie information is provided by the YTS.mx API and is offered on an "as is" and "as available" basis. We do not warrant the accuracy, completeness, or timeliness of this information.
            </li>
            <li>
              <strong>Availability of Service:</strong> We do not guarantee that the Service will be available at all times or that it will be error-free.
            </li>
          </ul>
        </section>

        <Separator className="my-6" />
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
          <p className="text-foreground leading-relaxed">
            To the fullest extent permitted by applicable law, FlickFetch shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Service; (b) any conduct or content of any third party on the Service; (c) any content obtained from the Service; or (d) unauthorized access, use, or alteration of your transmissions or content.
          </p>
        </section>

        <Separator className="my-6" />
        
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">7. Indemnification</h2>
          <p className="text-foreground leading-relaxed">
            You agree to defend, indemnify, and hold harmless FlickFetch and its employees, contractors, agents, officers, and directors from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees), resulting from or arising out of a) your use and access of the Service, or b) a breach of these Terms.
          </p>
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">8. Changes to Terms</h2>
          <p className="text-foreground leading-relaxed">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <Separator className="my-6" />

        <section>
          <h2 className="text-2xl font-semibold mb-3">9. Governing Law</h2>
          <p className="text-foreground leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of the jurisdiction applicable to the operators of FlickFetch, without regard to its conflict of law provisions.
          </p>
        </section>
      </div>
    </Container>
  );
}
