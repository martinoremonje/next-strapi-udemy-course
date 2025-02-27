import { fetchApi } from '@/helpers/fetch-api';
import { Post } from '@/interfaces/post';
import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { formatDate } from '@/helpers/format-date-helper';

const getData = async (slug: string): Promise<Post | null> => {
    const path = "/posts";
    const urlParamsObject = {
        populate: "*",
        filters: { slug }
    };
    const { data } = await fetchApi(path, urlParamsObject);
    return data[0] || null;
};



const Slug = async ({ params }) => {
    const {slug} = params
    const post: Post | null = await getData(slug);

    if (!post) {
        return notFound();
    }

    const { title, body, createdAt, image } = post;
    const { url, width, height } = image.formats.medium;
    const bodie = body[0].children[0].text;

    return (
        <div className='space-y-8'>
            <PageHeader title={title} />
            <p className='text-gray-500'>
                {formatDate(createdAt)}
            </p>
            <Image className="rounded-t-lg" src={url} alt={`image ${title}`} width={width} height={height} />
            <div className='prose'>
                {bodie}
            </div>
        </div>
    );
};

export default Slug;
