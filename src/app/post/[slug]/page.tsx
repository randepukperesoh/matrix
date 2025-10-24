// import { notFound } from "next/navigation";

// type Props = {
//   params: {
//     slug: string;
//   };
// };

// async function getPostData(slug: string) {
//   const mockPosts: Record<
//     string,
//     { slug: string; title: string; content: string }
//   > = {
//     "1": {
//       slug: "первый-пост",
//       title: "Заголовок первого поста",
//       content: "<p>Контент первого поста.</p>",
//     },
//     "2": {
//       slug: "второй-пост",
//       title: "Заголовок второго поста",
//       content: "<p>Контент второго поста.</p>",
//     },
//     "3": {
//       slug: "третий-пост",
//       title: "Заголовок третьего поста",
//       content: "<p>Контент третьего поста.</p>",
//     },
//   };

//   return mockPosts[slug] || null;
// }

// export async function generateMetadata({ params }: Props) {
//   const { slug } = await params;
//   const postData = await getPostData(slug);

//   if (!postData) {
//     return {
//       title: "Пост не найден",
//     };
//   }

//   return {
//     title: postData.title,
//     description: postData.content.substring(0, 150),
//   };
// }

export default async function PostPage({ params }: Props) {
  // const { slug } = await params;
  // const postData = await getPostData(slug);

  console.log(params.slug);

  // if (!postData) {
  // notFound();
  // }

  return (
    <div>
      {/* <h1>{postData.title}</h1>
      <p>Slug: {postData.slug}</p>
      <div dangerouslySetInnerHTML={{ __html: postData.content }} /> */}
    </div>
  );
}

// export async function generateStaticParams() {
//   return [
//     { slug: "первый-пост" },
//     { slug: "второй-пост" },
//     { slug: "третий-пост" },
//   ];
// }
