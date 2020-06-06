import useSWR, { ConfigInterface } from "swr";
import { Note } from "./notes";

export interface Site {
  site: {
    id: number;
    user_id: number;
    name: string;
    headline: string;
    about: string;
    host: any;
    created_at: string;
    updated_at: string;
    site_path: string;
    published: boolean;
    tinyletter: string;
    domain: string;
  };
  notes: Note[];
}

export function readSite(site: string): Promise<Site> {
  return fetch(`https://collectednotes.com/${site}.json`).then((res) =>
    res.json()
  );
}

export function useSite(site: string, options: ConfigInterface) {
  return useSWR<Site, never>(site, readSite, options);
}
