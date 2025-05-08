import Link from "next/link";

export default function NotFound() {
  return (
    <div className="dark">
      <h1>
        Ahoy Sailor! Looks like ye are stranded alone on this island of lost
        pages...
      </h1>
      <p>
        This be no place for the likes of you — just tumbleweeds, broken links,
        and echoes of forgotten treasure maps. The page ye be seekin’ has
        vanished into the depths of Davy Jones` locker. fear not! Hoist yer
        sails and steer back to safer shores:
      </p>
      <ul>
        <li>
          * ⚓
          <Link href="/" className="text-blue-600">
            Home Port
          </Link>
        </li>
        <li>
          * 🧭
          <Link href="/about" className="text-blue-600">
            Explore
          </Link>
        </li>
        <li>
          * 🦜
          <Link href="/whoami" className="text-blue-600">
            Have a look at your boat
          </Link>
        </li>
      </ul>
    </div>
  );
}
