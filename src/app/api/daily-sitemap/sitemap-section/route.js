import { NextResponse } from 'next/server';
import axios from "axios";

export async function GET() {
    const { data } = await axios.get(`${process.env.API_URL}/daily-sitemap/sitemap-section`,{ 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    });

    let onlinenav = data.map((row, i) => {
        return `<url>
                <loc>${process.env.NEXT_PUBLIC_BASE_URL}/category/${row.slug}</loc>
                <changefreq>hourly</changefreq>
            </url>`;
    });

    // generate sitemap here
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${onlinenav}
    </urlset>`

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