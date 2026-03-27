import { Page } from "@/components/Page";
import { getPost, Post } from "@/clients/api";
import { Layout } from "@snokam/core";
import { LayoutTheme, Padding } from "@snokam/core/layout";
import { GetServerSideProps } from "next";
import Link from "next/link";

interface PostPageProps {
  post: Post | null;
}

export const getServerSideProps: GetServerSideProps<PostPageProps> = async (context) => {
  const { slug } = context.params as { slug: string };
  try {
    const post = await getPost(slug);
    return { props: { post } };
  } catch (error) {
    return { props: { post: null } };
  }
};

const PostPage = ({ post }: PostPageProps) => {
  if (!post) {
    return (
      <Page>
        <Layout.Container theme={LayoutTheme.Light}>
          <Layout.Content>
            <Layout.Section padding={{ bottom: Padding.Large }}>
              <p>Post not found</p>
              <Link href="/">← Back to all posts</Link>
            </Layout.Section>
          </Layout.Content>
        </Layout.Container>
      </Page>
    );
  }

  return (
    <Page>
      <Layout.Container theme={LayoutTheme.Light}>
        <Layout.Content>
          <Layout.Section padding={{ bottom: Padding.Large }}>
            <Link href="/">← Back to all posts</Link>
            <h1>{post.title}</h1>
            <p>
              By {post.author} · {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            {post.imageUrl && (
              <img src={post.imageUrl} alt={post.title} style={{ maxWidth: "100%", marginBottom: "1rem" }} />
            )}
            <p>{post.content}</p>
            {post.tags.length > 0 && (
              <p>Tags: {post.tags.join(", ")}</p>
            )}
          </Layout.Section>
        </Layout.Content>
      </Layout.Container>
    </Page>
  );
};

export default PostPage;
