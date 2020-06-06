import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { Note } from "data/notes";
import { readSite, Site } from "data/site";

export const getStaticProps: GetStaticProps<Site> = async () => {
  const { site, notes } = await readSite(process.env.SITE_PATH);

  return { props: { site, notes } };
};

export default function Articles(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <section className="space-y-12">
      <header className="max-w-screen-lg mx-auto mt-24">
        <h1 className="text-4xl font-semibold tracking-wide">{props.site.name}</h1>
      </header>
      <ul className="max-w-lecture mx-auto">
        {props.notes.map((note) => (
          <li key={note.id}>
            <Link href="/notes/[slug]" as={`/notes/${note.path}`}>
              <a>
                <article>
                  <h2 className="text-2xl font-semibold leading-none tracking-wide">
                    {note.title}
                  </h2>
                  <p className="text-gray-600 whitespace-pre-wrap">{note.headline}</p>
                </article>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
