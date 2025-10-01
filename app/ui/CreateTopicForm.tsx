import Link from 'next/link';

export default function CreateTopicForm() {
  return (
    <form>
      //...
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/ui"
          className="flex h-10 items-center..."
        >
          Cancel
        </Link>
        <button type="submit">Create Topic</button>
      </div>
    </form>
  );
}