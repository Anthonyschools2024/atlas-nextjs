import { HashtagIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';

// ...

export function Topic({ id, text }: Props) {
  return (
    <Link
      href={`/ui/topics/${id}`}
      className="flex items-center..."
    >
      //...
    </Link>
  );
}