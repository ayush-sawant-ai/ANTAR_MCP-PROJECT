# Personal Portfolio & Blog Website

A modern, responsive portfolio and blog website built with Next.js 14 and Tailwind CSS.

## Features

- **Responsive Design**: Fully responsive across all devices
- **Modern UI**: Clean, minimalist design with glass morphism effects
- **Performance Optimized**: Built with Next.js 14 for optimal performance
- **Type Safe**: Built with TypeScript for better code quality
- **SEO Friendly**: Optimized for search engines

## Pages

- **Home**: Landing page with hero section and featured projects
- **About**: Personal information, skills, and experience
- **Projects**: Portfolio of recent work and projects
- **Blog**: Articles and tutorials about web development
- **Contact**: Contact form and social media links

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Images**: Next.js Image component with optimization

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Colors
The color palette can be customized in `tailwind.config.js` and `src/app/globals.css`.

### Content
- Update personal information in the page components
- Add your own project images to the `public/images` directory
- Modify the blog posts in the blog page component
- Update contact information and social media links

### Images
Replace the placeholder images in `public/images/` with your own images:
- `abstract_tech_background_dark_blue_purple.jpg` - Hero background
- `professional_profile_avatar_business.jpg` - Profile photo
- `web_development_project_mockup.jpg` - Project thumbnails
- `mobile_app_design_interface.jpg` - Project thumbnails
- `data_visualization_dashboard.jpg` - Project thumbnails
- `professional_workspace_desk_setup.jpg` - About page image

## Deployment

The website is ready for deployment on platforms like Vercel, Netlify, or any other hosting service that supports Next.js.

For Vercel deployment:
1. Push your code to a Git repository
2. Connect your repository to Vercel
3. Deploy with default settings

## License

This project is open source and available under the [MIT License](LICENSE).
