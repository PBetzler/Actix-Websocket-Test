/**
 * Some example requests:
 *
 * httpGet("endpoint_url")
    .then(responseHandler)
    .then((json) => console.log(json))
    .catch(catchHandler)
    .finally(finallyHandler);

 * httpPost("endpoint_url", { elem: 42 })
    .then(responseHandler)
    .then((json) => console.log(json))
    .catch((err) => {
        console.warn("Oh no!");
        catchHandler(err);
    })
    .finally(finallyHandler);
 */

import { writable, Writable } from "svelte/store";

const API_URL: string = "http://127.0.0.1:3000";
const HEADERS: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "Test-Frontend(aka Bananas)",
};

export let fetches: Writable<number> = writable(0);

export function httpGet(endpoint: string, options: Partial<RequestOptions> = { baseUrl: "", queryParams: [] }): Promise<Response> {
    fetches.update((n) => n + 1);
    return fetch(makeQueryUrl(endpoint, options), {
        method: "GET",
        headers: HEADERS,
    });
}

export function httpPost(endpoint: string, body: any, options: Partial<RequestOptions> = { baseUrl: "", queryParams: [] }): Promise<Response> {
    fetches.update((n) => n + 1);
    return fetch(makeQueryUrl(endpoint, options), {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify(body),
    });
}

export function httpPut(endpoint: string, body: any, options: Partial<RequestOptions> = { baseUrl: "", queryParams: [] }): Promise<Response> {
    fetches.update((n) => n + 1);
    return fetch(makeQueryUrl(endpoint, options), {
        method: "PUT",
        headers: HEADERS,
        body: JSON.stringify(body),
    });
}

export function httpDel(endpoint: string, options: Partial<RequestOptions> = { baseUrl: "", queryParams: [] }): Promise<Response> {
    fetches.update((n) => n + 1);
    return fetch(makeQueryUrl(endpoint, options), {
        method: "DELETE",
        headers: HEADERS,
    });
}

export function responseHandler(res: Response): Promise<any> {
    if (res.status >= 400) {
        //if (res.status == 401) user.set(null);
        const error: string = `HTTP Fetch Error: ${res.status} ${res.statusText}`;
        throw new Error(error);
    }
    return res.json();
}

export function catchHandler(err: any): Promise<any> {
    console.error(err);
    return Promise.resolve();
}

export function finallyHandler(): Promise<any> {
    fetches.update((n) => Math.max(n - 1, 0));
    return Promise.resolve();
}

export function setFetches(n: number): void {
    fetches.set(n);
}

export function makeQueryUrl(endpoint: string, options: Partial<RequestOptions> = { baseUrl: "", queryParams: [] }): string {
    let url: string;
    if (options?.baseUrl != "") url = options.baseUrl;
    else url = API_URL;
    url += endpoint;
    if (options?.queryParams?.length > 0) {
        url += "?";
        options.queryParams.forEach((q) => (url += `${q.key}=${q.val}&`));
        url = url.slice(0, url.length - 1); // Remove last '&'
    }
    return url;
}

export function signup(): void {
    login();
}

export function login(): void {
    window.location.href = makeQueryUrl("auth/github");
}

export function logout(): void {
    window.location.href = makeQueryUrl("auth/logout");
}

export class RequestOptions {
    baseUrl: string;
    queryParams: QueryParam[];
}

export class QueryParam {
    key: string;
    val: string;
}
