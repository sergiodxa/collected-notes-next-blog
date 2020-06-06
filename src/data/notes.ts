export interface Note {
  id: number;
  site_id: number;
  user_id: number;
  body: string;
  path: string;
  headline: string;
  title: string;
  created_at: string;
  updated_at: string;
  visibility: string;
  url: string;
}

export function readNote(site: string, slug: string): Promise<Note> {
  return fetch(`https://collectednotes.com/${site}/${slug}.json`).then((res) =>
    res.json()
  );
}
