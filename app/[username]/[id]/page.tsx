import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import BlogPage from "@/components/blogpage";
import { User, Blog as PrismaBlog, Like as PrismaLike } from "@prisma/client";

export default async function Blog({
  params,
}: {
  params: Promise<{ username: string; id: string }>;
}) {
  const { username, id } = await params;

  const blog = await prisma.blog.findUnique({
    select: {
      id: true,
      title: true,
      slug: true,
      createdAt: true,
      content: true,
      category: true,
      likes: {
        select: {
          userId: true,
        },
      },
      author: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
    where: { slug: id, author: { slug: username } },
    cacheStrategy: {
      ttl: 60,
      swr: 60,
      tags: ["blogs"],
    },
  });

  if (!blog) {
    return <div>Blog not found</div>;
  }

  const cookieSession = (await cookies()).get("metapress");
  const userId = cookieSession ? JSON.parse(cookieSession.value).id : null;
  const isAuthor = userId === blog.author.id;
  const isLiked = blog.likes.some((like) => like.userId === userId);

  const transformedBlog = {
    ...blog,
    likes: blog.likes.map((like) => ({ userId: like.userId, blogId: blog.id })),
  } as PrismaBlog & {
    author: Pick<User, "id" | "name" | "slug">;
    likes: PrismaLike[];
  };

  return (
    <BlogPage blog={transformedBlog} isAuthor={isAuthor} isLiked={isLiked} />
  );
}
