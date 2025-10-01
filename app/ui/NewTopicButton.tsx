import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

export default function NewTopicButton() {
  return (
    <Link href="/ui/topics/new">
      <button className="flex h-[48px] w-full...">
        //...
      </button>
    </Link>
  );
}