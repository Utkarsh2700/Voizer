// import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <p>
          All agents list to be displayed on agents so. Go to Agents List page.
          This is the homepage
        </p>
      </div>
      <Link className="text-blue-500 text-3xl font-semibold" href={"/agents"}>
        Agents List page
      </Link>
    </>
  );
}
