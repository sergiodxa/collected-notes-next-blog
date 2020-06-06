import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import { readSite, Site, useSite } from "data/site";

export const getStaticProps: GetStaticProps<Site> = async () => {
  const { site, notes } = await readSite(process.env.SITE_PATH);

  return { props: { site, notes } };
};

export default function Notes(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data }= useSite(process.env.SITE_PATH, {
    initialData: props,
    revalidateOnMount: true,
  });

  return (
    <section className="space-y-12">
      <header className="max-w-screen-lg mx-auto mt-24">
        <h1 className="text-4xl font-semibold tracking-wide">
          {data.site.name}
        </h1>
      </header>
      <ul className="max-w-lecture mx-auto space-y-8">
        {data.notes.map((note) => (
          <li key={note.id}>
            <Link href="/notes/[slug]" as={`/notes/${note.path}`}>
              <a>
                <article>
                  <h2 className="text-2xl font-semibold leading-none tracking-wide">
                    {note.title}
                  </h2>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {note.headline}
                  </p>
                </article>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
