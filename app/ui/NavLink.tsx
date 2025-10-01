//...
import Link from 'next/link';

export default function NavLink({ name, href }: Props) {
  return (
    <Link
      key={name}
      href={href}
      className={clsx(...)}
    >
      //...
    </Link>
  );
}