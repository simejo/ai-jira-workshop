import { Page } from "@/components/Page";
import { getPosts, Post } from "@/clients/api";
import { Layout } from "@snokam/core";
import { LayoutTheme, Padding, TransitionType } from "@snokam/core/layout";
import { GetServerSideProps } from "next";

interface HomePageProps {
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    const posts = await getPosts();
    return { props: { posts } };
  } catch (error) {
    return { props: { posts: [] } };
  }
};

const HomePage = ({ posts }: HomePageProps) => (
  <Page>
    <Layout.Container
      theme={LayoutTheme.Light}
      transitions={{
        bottom: {
          type: TransitionType.Wave,
        },
      }}
    >
      <Layout.Content>
        <Layout.Section padding={{ bottom: Padding.Large }}>
          <h1>Cursor Workshop</h1>
          {posts.length > 0 ? (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No posts found</p>
          )}
        </Layout.Section>
      </Layout.Content>
    </Layout.Container>
  </Page>
);

export default HomePage;
