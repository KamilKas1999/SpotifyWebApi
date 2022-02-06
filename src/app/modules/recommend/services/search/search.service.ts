import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse } from '../../models/response/searchResponse.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private SEARCH_LINK = 'https://api.spotify.com/v1/search';

  constructor(private http: HttpClient) {}

  public search(query: string) {
    const url = new URL(this.SEARCH_LINK);
    url.searchParams.append('q', query);
    url.searchParams.append('type', 'track,artist');
    url.searchParams.append('limit', '3');
    return this.http.get<SearchResponse>(url.href);
  }
}
