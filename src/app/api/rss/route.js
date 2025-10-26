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
            <link>https://www.news24bd.tv/details/${row.n_id}</link>
            <pubDate>${row.start_at} GMT</pubDate>
            <guid isPermaLink="false">https://www.news24bd.tv/details/${row.n_id}</guid>
        </item>`
    });


    const xml = `<?xml version="1.0" encoding="utf-8"?>  
        <rss xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">  
        <channel>  
            <title>news24bd</title>
            <link>https://www.news24bd.tv</link>
            <description>news24bd RSS Feed</description>
            <atom:link href="https://www.news24bd.tv/rss.xml" rel="self" type="application/rss+xml" />

            ${items}

        </channel>  
        </rss>
        `;

    return new Response(xml, {
        status: 200,
        headers: { 'Content-Type': 'text/xml' },
    })
}