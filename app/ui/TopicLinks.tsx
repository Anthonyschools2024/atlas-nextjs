import { fetchTopics } from "@/lib/data";
import TopicLink from "./TopicLink";

// This is now a React Server Component.
// By making it an `async` function, we can fetch data directly inside it.
export default async function TopicLinks() {
  // 1. FIX: Fetch topics directly from the database instead of using placeholders.
  const topics = await fetchTopics();

  return (
    <>
      {/* 2. Map over the real data and render a link for each topic. */}
      {topics.map((topic) => {
        return <TopicLink key={topic.id} id={topic.id} title={topic.title} />;
      })}
    </>
  );
}