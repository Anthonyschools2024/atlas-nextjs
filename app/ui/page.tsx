import { fetchTopics } from "@/lib/data";
import { Topic } from "@/app/ui/Topic";

// This is also a React Server Component for fetching the main page content.
export default async function Page() {
  // 1. Fetch all topics from the database.
  const topics = await fetchTopics();

  return (
    <div className="w-full">
      <h1 className="text-3xl font-black mb-8">All Topics</h1>
      <div className="flex flex-col">
        {/* 2. Map over the topics and display each one using the Topic component. */}
        {topics.map((topic) => (
          <Topic key={topic.id} id={topic.id} text={topic.title} />
        ))}
      </div>
    </div>
  );
}