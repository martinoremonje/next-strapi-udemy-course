import { fetchApi } from '@/helpers/fetch-api'
import React from 'react'
import PageHeader from '@/components/PageHeader';
import PageCardImage from '@/components/PageCardImage';
import { Post } from '@/interfaces/post';
import PagePagination from '@/components/PagePagination';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const getData = async (page = 1, pageSize = 4) => {
  const path = "/posts";
  const urlParamsObject = {
    populate: "*",
    sort: { createdAt: "asc" },
    pagination: { page, pageSize }
  };

  const { data, meta } = await fetchApi(path, urlParamsObject);
  return { data, pagination: meta.pagination };
}

export async function generateMetadata(props: { 
  params: Params; 
  searchParams: SearchParams; 
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;
}

interface Props {
  params: Params;
  searchParams: SearchParams;
}

const Blog = async ({ params, searchParams }: Props) => {
  const paramsResolved = await params;
  const searchParamsResolved = await searchParams;
  const { slug } = paramsResolved;
  const { page } = searchParamsResolved;
  let pageNumber = page ? parseInt(page as string) : 1;

  if (isNaN(pageNumber) || pageNumber < 1) {
    pageNumber = 1;
  }

  const { data, pagination } = await getData(pageNumber);
  console.log(data);

  return (
    <div className='container mx-auto max-w-3xl space-y-4'>
      <PageHeader title="Latest Posts" />
      <PagePagination pagination={pagination} />
      <div className="grid gap-4 justify-items-center">
        {data.map((post: Post) => (
          <PageCardImage key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Blog;
