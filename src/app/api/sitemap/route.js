import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'

export async function GET() {
    let sitemap = `<sitemap>
            <loc>${process.env.NEXT_PUBLIC_BASE_URL}/daily-sitemap/sitemap-section.xml</loc>
        </sitemap>`;
    let loop = new Date();

    for (let i = 0; i < 90; i++) {
        let nextDate = i==0 ? loop.setDate(loop.getDate()) : loop.setDate(loop.getDate() - 1);
        loop = new Date(nextDate);
        let setdate = loop.toISOString().substring(0, 10);
        sitemap += `<sitemap>
                <loc>${process.env.NEXT_PUBLIC_BASE_URL}/daily-sitemap/${setdate}/sitemap.xml</loc>
                <lastmod>${setdate}</lastmod>
            </sitemap>`;
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemap}
    </sitemapindex>`;

    return new Response(xml, {
        status: 200,
        headers: {
             'Content-Type': 'text/xml',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        },
    })
}