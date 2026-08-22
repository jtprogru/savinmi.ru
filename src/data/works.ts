/**
 * Тип для списка работ, который страница отдаёт в JSON-LD.
 *
 * Сами данные лежат во frontmatter страницы — рядом с видимым списком,
 * чтобы разметка и текст не разъезжались при правках. В граф уходит
 * ItemList, где каждый элемент привязан к ID.person: это склеивает
 * статьи, слайды и подкаст с одной сущностью автора.
 */
export type Work = {
    name: string;
    url: string;
    /** schema.org-тип: BlogPosting, Article, PresentationDigitalDocument, PodcastSeries… */
    type?: string;
    /** площадка, если работа опубликована не на своей: Habr, Avito */
    publisher?: string;
    /** contributor — участвовал, но не автор (гость подкаста) */
    role?: "author" | "contributor";
};
