import { NextResponse } from 'next/server';
import axios from "axios";

export async function GET(request, { params }) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || 1;

    const data = await axios.get(`${process.env.API_URL}/todayall?page=${page}`, {
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

    return NextResponse.json(getArray)

}