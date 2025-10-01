// ...
import clsx from "clsx";
import Link from 'next/link';

// ...

export default function TopicLink({ id, title }: Props) {
  const href = `/ui/topics/${id}`;
  return (
    <Link
      href={href}
      className={clsx(...)}
    >
      //...
    </Link>
  );
}