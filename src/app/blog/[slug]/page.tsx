import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getStrapiURL } from "@/helpers/api-helper";
import { formatDate } from "@/helpers/format-date-helper";
import { fetchApi } from "@/helpers/fetch-api";
import { Post } from "@/interfaces/post";
import Image from "next/image";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata(props: { 
  params: Params; 
  searchParams: SearchParams; 
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;
}

export default async function Slug(props: { 
  params: Params; 
  searchParams: SearchParams; 
}) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const slug = params.slug;
  const query = searchParams.query;

  const post: Post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const { title, description, publishedAt, image, body } = post;
  const { url, width, height } = image.formats.medium;

  return (
    <div className="space-y-8">
      <h1 className="text-5xl font-extrabold dark:text-white">{title}</h1>
      <p className="text-gray-500 mb-2">{formatDate(publishedAt)}</p>
      <Image
        className="h-auto rounded-lg"
        src={url}
        alt={`imagen de ${title}`}
        width={width}
        height={height}
      />
      <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
        {description}
      </p>
      <div className="prose">
        {/* Este error en particular está codificado en TypeScript. El equipo de React está trabajando con el equipo de TypeScript para resolver esto. */}
        {/* https://github.com/vercel/next.js/issues/42292 */}
        {/* @ts-expect-error Server Component */}
        <MDXRemote source={body} />
      </div>
    </div>
  );
}

const getPost = async (slug: string) => {
  const path = `/posts`;
  const urlParamsObject = {
    filters: {
      slug: slug,
    },
    populate: "image",
  };

  const { data } = await fetchApi(path, urlParamsObject);
  return data[0];
};
