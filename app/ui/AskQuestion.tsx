import { createQuestion } from '@/lib/actions';

// Updated to accept topicId to associate the new question correctly.
export function AskQuestion({ topicId }: { topicId: string }) {
  // We use .bind to pass the topicId to the server action.
  const createQuestionWithId = createQuestion.bind(null, topicId);

  return (
    <form action={createQuestionWithId} className="relative my-8">
      <input
        type="text"
        name="title"
        placeholder="Ask a question"
        className="mt-1 block w-full rounded-md border border-atlas-white-300 bg-inherit py-3 pl-3 pr-28 text-lg text-gray-900 placeholder-gray-400 focus:outline-hidden focus:ring-3 focus:ring-atlas-teal"
        required
      />
      <button className="absolute right-2 top-2 flex h-10 w-24 items-center justify-center rounded-md border bg-secondary px-4 text-lg text-white focus:bg-secondary">
        Ask
      </button>
    </form>
  );
}