import { fetchQuestions, fetchTopic } from "@/lib/data";
import { Question } from "@/app/ui/Question";
import { AskQuestion } from "@/app/ui/AskQuestion";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { notFound } from "next/navigation";

// This is a dynamic Server Component. It receives the `id` from the URL via `params`.
export default async function Page({ params }: { params: { id: string } }) {
  
  // 1. Fetch the topic's details and its associated questions concurrently.
  // This is more performant than awaiting them one by one.
  const [topic, questions] = await Promise.all([
    fetchTopic(params.id),
    fetchQuestions(params.id),
  ]);

  // If no topic is found for the given ID, show a 404 page.
  if (!topic) {
    notFound();
  }

  return (
    <div className="w-full">
      <h1 className="text-3xl font-black flex items-center mb-4">
        <HashtagIcon className="h-8 w-8 mr-2" />
        {topic.title}
      </h1>
      
      {/* Ask a question form */}
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-1 mb-4">
          <AskQuestion topic={topic.title} />
      </div>

      {/* List of questions */}
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-1">
        {questions.length > 0 ? (
          questions.map((question) => (
            <Question
              key={question.id}
              id={question.id}
              text={question.title}
              votes={question.votes}
            />
          ))
        ) : (
          <p className="p-6 text-gray-500">No questions for this topic yet. Be the first to ask one!</p>
        )}
      </div>
    </div>
  );
}