import { HandThumbUpIcon } from '@heroicons/react/24/outline';
import { incrementVote } from '@/lib/actions';

// Updated to accept both questionId and topicId.
export default function VoteButton({ questionId, topicId }: { questionId: string, topicId: string }) {
  // .bind passes both IDs to the server action when the form is submitted.
  const incrementVoteWithIds = incrementVote.bind(null, questionId, topicId);

  return (
    <form action={incrementVoteWithIds}>
      <button
        type="submit"
        className="h-8 w-8 min-w-[2rem] rounded-full ring-gray-200 hover:text-atlas-teal active:bg-primary active:text-white active:outline-hidden active:ring-2 active:ring-primary"
      >
        <HandThumbUpIcon />
      </button>
    </form>
  );
}