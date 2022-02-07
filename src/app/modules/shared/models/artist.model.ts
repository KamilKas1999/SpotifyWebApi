import { ImageProperty } from './image.model';

export class Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  name: string;
  id: string;
  type: string;
  uri: string;
  genres: string[];
  images: ImageProperty[];
}
