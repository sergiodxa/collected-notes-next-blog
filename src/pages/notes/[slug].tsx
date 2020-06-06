import {
  GetStaticProps,
  GetStaticPropsContext,
  InferGetStaticPropsType,
  GetStaticPaths,
} from "next";
import { useRouter } from "next/router";
import marked from "marked";
import { readNote, Note } from "data/notes";
import { readSite, Site } from "data/site";
import Link from "next/link";

function unwrap<Value>(value: Value | Value[]): Value {
  if (Array.isArray(value)) return value[0];
  return value;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { notes } = await readSite(process.env.SITE_PATH);
  const paths = notes.map((note) => {
    return { params: { slug: note.path } };
  });
  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<{
  note: Note;
  site: Site["site"];
}> = async ({ params }: GetStaticPropsContext) => {
  const { slug } = params;
  const { site } = await readSite(process.env.SITE_PATH);
  const note = await readNote(process.env.SITE_PATH, unwrap<string>(slug));
  return { props: { note, site } };
};

export default function Articles(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { isFallback } = useRouter();
  return (
    <section className="max-w-screen-lg mx-auto mt-24">
      <header className="max-w-screen-lg mx-auto mt-24">
        <h2 className="font-semibold tracking-tight">
          <Link href="/">
            <a>{isFallback ? "Loading site title..." : props.site.name}</a>
          </Link>
        </h2>
      </header>
      <article
        className="markdown max-w-lecture mx-auto space-y-4"
        dangerouslySetInnerHTML={{
          __html: isFallback
            ? "<h1>Loading note title...</h1><p>Loading note body...</p>"
            : marked(props.note.body),
        }}
      />
      <footer className="border-t border-gray-600 mt-4 mb-12 pt-4 px-4">
        <p className="text-gray-600 text-xs">
          {isFallback ? (
            "Loading note metadata..."
          ) : (
            <>
              Updated on{" "}
              <time dateTime={props.note.updated_at}>
                {new Intl.DateTimeFormat("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }).format(new Date(props.note.updated_at))}
              </time>
            </>
          )}
        </p>
      </footer>
    </section>
  );
}
