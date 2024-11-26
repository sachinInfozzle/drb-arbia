/** @type {import('next').NextConfig} */
const nextConfig = {
    i18n: {
      locales: ['en', 'ar'], // Define supported locales
      defaultLocale: 'en',   // Set the default locale
      localeDetection: true, // Automatically detect user's locale
    },
  };
  
  export default nextConfig;