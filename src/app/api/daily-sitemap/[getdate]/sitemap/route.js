import { NextResponse } from 'next/server';
import axios from "axios";

export async function GET(request, { params }) {
    const { data } = await axios.get(`${process.env.API_URL}/daily-sitemap/${params.getdate}/sitemap`, {
        headers: { "Accept-Encoding": "gzip,deflate,compress" }
    });

    let urls = data.map((row) => {
        return `<url>
          <loc>${process.env.NEXT_PUBLIC_BASE_URL}/${row.cat_name.slug}/news/bd/${row.n_id}.details</loc>
          <news:news>
              <news:publication>
                  <news:name>Banglanews24.com</news:name>
                  <news:language>bn</news:language>
              </news:publication>
              <news:publication_date>${row.start_at}</news:publication_date>
              <news:title>${row.n_head}</news:title>
          </news:news>
      </url>`;
    });

    // generate sitemap here
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
        ${urls.join('')}
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

