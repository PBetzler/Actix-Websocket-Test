export function sanitizeHTML(htmlString: string): string {
    return htmlString.replace(/<\/?[^>]+(>|$)|&nbsp;/g, "");
}