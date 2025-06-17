
import type { Metadata } from 'next';
import Container from '@/components/layout/container';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Privacy Policy - FlickFetch',
  description: 'Read the FlickFetch Privacy Policy to understand how we handle your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 font-headline">Privacy Policy</h1>
        {/* Last Updated date removed to allow metadata export from Server Component */}

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
          <p className="text-foreground leading-relaxed">
            Welcome to FlickFetch ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
          </p>        
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
          <p className="text-foreground leading-relaxed mb-2">
            FlickFetch is designed to minimize data collection. We primarily collect the following types of information:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>
              <strong>Search Queries:</strong> When you search for movies, we process your query terms to fetch results from the YTS.mx API. These queries are not stored in a way that personally identifies you.
            </li>
            <li>
              <strong>Technical Data:</strong> Like most websites, we may automatically collect certain information when you visit, such as your IP address (which may be logged by our hosting provider for security and operational purposes), browser type, and operating system. This data is used for analytics and to ensure the proper functioning of our service.
            </li>
          </ul>
          <p className="text-foreground leading-relaxed mt-2">
            We do not require user registration and do not knowingly collect personally identifiable information (PII) beyond what is technically necessary for the site's operation.
          </p>
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">3. How We Use Your Information</h2>
          <p className="text-foreground leading-relaxed mb-2">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>Provide, operate, and maintain our website and services.</li>
            <li>Fulfill your search requests and display movie information.</li>
            <li>Improve our website and services by analyzing usage patterns (on an aggregated, non-identifiable basis).</li>
            <li>Ensure the security and integrity of our platform.</li>
          </ul>
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">4. Third-Party Services</h2>
          <p className="text-foreground leading-relaxed mb-2">
            FlickFetch relies on third-party services:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>
              <strong>YTS.mx API:</strong> Movie data and torrent information are fetched from the YTS.mx API. Your interactions related to fetching this data are subject to YTS.mx's terms and privacy policy.
            </li>
             <li>
              <strong>Advertising:</strong> We use third-party advertising services (e.g., A-ADS) to display ads on our website. These services may use cookies or other tracking technologies to collect information about your visits to this and other websites to provide relevant advertisements. Please refer to the privacy policies of these advertising providers for more information on their data collection practices.
            </li>
          </ul>
        </section>
        
        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">5. Cookies</h2>
          <p className="text-foreground leading-relaxed">
            FlickFetch may use essential cookies for basic site functionality (e.g., session management). Third-party services, such as our advertising partners, may also use cookies. You can manage cookie preferences through your browser settings.
          </p>
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
          <p className="text-foreground leading-relaxed">
            We implement reasonable administrative, technical, and physical security measures to protect your information from unauthorized access, use, or disclosure. However, no internet transmission or electronic storage is 100% secure.
          </p>
        </section>

        <Separator className="my-6" />

        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">7. Children's Privacy</h2>
          <p className="text-foreground leading-relaxed">
            FlickFetch is not intended for children under the age of 13 (or the relevant age of consent in your jurisdiction). We do not knowingly collect personal information from children.
          </p>
        </section>

        <Separator className="my-6" />

        <section>
          <h2 className="text-2xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
          <p className="text-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>
      </div>
    </Container>
  );
}
