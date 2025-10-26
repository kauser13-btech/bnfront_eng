import { NextResponse } from 'next/server';
import axios from "axios";

export async function GET(request, { params }) {
    const apiURL = request.url.replace(`${process.env.NEXT_PUBLIC_SERVER_HOST}/api/author`,`${process.env.API_URL}/web_author`);

    const data = await axios.get(apiURL,{ 
            headers: { 
                "Accept-Encoding": "gzip,deflate,compress",
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            return response.data;
        }).catch(function (res) {
            // console.log(res)
        });


    const getArray = await data;

    return NextResponse.json({
        'banner_desktop':getArray.banner_desktop,
        'banner_mobile':getArray.banner_mobile,
        'newsList':{
            'current_page': getArray.newsList.current_page,
            'data': getArray.newsList.data,
            'last_page': getArray.newsList.last_page,
        },
    })

}