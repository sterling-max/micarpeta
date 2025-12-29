import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'MiCarpeta - Gestor de Ciudadanía Italiana',
        short_name: 'MiCarpeta',
        description: 'Gestiona tu trámite de ciudadanía italiana paso a paso.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2563eb',
        icons: [
            {
                src: '/icon.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icon.png',
                sizes: 'any',
                type: 'image/png'
            }
        ],
    };
}
