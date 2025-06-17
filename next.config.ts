
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Provide fallbacks for Node.js core modules that are not available in the Edge runtime.
    // This is often necessary for libraries that have optional Node.js-specific functionality.
    // Setting to `false` tells Webpack to treat them as empty modules.
    if (isServer) { // This applies to both Node.js server and Edge server builds
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        stream: false,
        net: false,
        tls: false,
        // Optional dependency from OpenTelemetry that might be causing issues
        '@opentelemetry/exporter-jaeger': false, 
      };
    }

    return config;
  },
};

export default nextConfig;
