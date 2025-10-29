import { NextResponse } from 'next/server'
import axios from "axios";

export async function GET() {
    
    const { data } = await axios.get(`${process.env.API_URL}/recent-rss`,{ 
        headers: { "Accept-Encoding": "gzip,deflate,compress" } 
    });

    let items = '';
    data.map((row, i) => {
        items += `<item>  
            <title>${row.n_head}</title>  
            <link>${process.env.NEXT_PUBLIC_BASE_URL}/${row.cat_name.slug}/news/bd/${row.n_id}.details</link>
            <pubDate>${row.start_at} GMT</pubDate>
            <guid isPermaLink="false">${process.env.NEXT_PUBLIC_BASE_URL}/${row.cat_name.slug}/news/bd/${row.n_id}.details</guid>
        </item>`
    });


    const xml = `<?xml version="1.0" encoding="utf-8"?>  
        <rss xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">  
        <channel>  
            <title>banglanews24</title>
            <link>https://en.banglanews24.com</link>
            <description>banglanews24 RSS Feed</description>
            <atom:link href="https://en.banglanews24.com/rss.xml" rel="self" type="application/rss+xml" />

            ${items}

        </channel>  
        </rss>
        `;

    return new Response(xml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml' },
    })
}