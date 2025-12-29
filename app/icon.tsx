import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
    width: 512,
    height: 512,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent', // Transparent background
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {/* Simple Filled Blue Folder Icon */}
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="#3b82f6"
                    stroke="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9l-2.6-2.6a2 2 0 0 0-1.4-.6H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16z" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
