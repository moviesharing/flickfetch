// src/components/ads/ad-unit.tsx

// Using React.useEffect to handle the 'Advertise here' link text and style manipulation
// to avoid hydration errors, as this part might be considered dynamic content by Next.js
// if directly rendered. However, for simple, static HTML like this, direct rendering is often fine.
// For robustness, especially if this component were more complex or if issues arose,
// useEffect could be used to ensure client-side only manipulation.
// Given the simplicity and the nature of ad code, direct rendering is usually preferred.

export default function AdUnit() {
  return (
    <div className="my-4 md:my-6">
      <div id="frame" style={{ width: '100%' }}>
        {/*
          The 'key' attribute is added to the iframe to help React manage it,
          especially if multiple AdUnit components are used on the same page
          or if the ad unit needs to be re-rendered under certain conditions.
          A unique key helps ensure React treats each instance distinctly.
          Using a timestamp or a unique ID generator would be more robust if needed,
          but for now, a static string is fine as a placeholder concept.
        */}
        <iframe
          key={`ad-iframe-2399071`}
          data-aa='2399071'
          src='//acceptable.a-ads.com/2399071'
          style={{
            border: '0px',
            padding: '0',
            width: '100%',
            height: '100%',
            minHeight: '90px', // Ensuring a minimum height for visibility
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
          title="Advertisement" // Added title for accessibility
        ></iframe>
        <a
          style={{ display: 'block', textAlign: 'right', fontSize: '12px', color: 'var(--muted-foreground)' }}
          id="frame-link"
          href="https://a-ads.com/campaigns/new/?source_id=2399071&source_type=ad_unit&partner=2399071"
          target="_blank" // Open in new tab
          rel="noopener noreferrer" // Security best practice for target="_blank"
        >
          Advertise here
        </a>
      </div>
    </div>
  );
}
