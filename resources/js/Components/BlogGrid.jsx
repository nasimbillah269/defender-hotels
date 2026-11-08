import { Link } from "@inertiajs/react";

const stripHtml = (html = "") => String(html).replace(/<[^>]*>/g, "").trim();

/**
 * Journal card.
 *  variant="blog" (default) → image + white card + "Read More" line
 *  variant="news"           → poster image + date badge + purple title box
 */
export default function BlogGrid({ post, variant = "blog" }) {
    const href = route("blogView", post.slug);
    const excerpt = stripHtml(post.short_description);

    if (variant === "news") {
        return (
            <Link href={href} className="dh-news-card">
                <img src={post.image_url} alt={post.name} loading="lazy" decoding="async" />
                {(post.month || post.date) && (
                    <span className="dh-news-card__date">
                        {String(post.month || "").toUpperCase()}
                        <b>{post.date}</b>
                    </span>
                )}
                <span className="dh-news-card__box">
                    {post.category && <span>{post.category}</span>}
                    <h5>{post.name}</h5>
                </span>
            </Link>
        );
    }

    return (
        <article className="dh-blog-card">
            <Link href={href} className="dh-blog-card__img">
                <img src={post.image_url} alt={post.name} loading="lazy" decoding="async" />
            </Link>
            <div className="dh-blog-card__body">
                <h5>
                    <Link href={href}>{post.name}</Link>
                </h5>
                {excerpt && <p>{excerpt.length > 120 ? `${excerpt.slice(0, 120)}…` : excerpt}</p>}
                <Link href={href} className="dh-readmore" aria-label={`Read more: ${post.name}`}>
                    <span>Read More</span>
                    <span className="dh-readmore__line" />
                    <span className="dh-readmore__arrow">→</span>
                </Link>
            </div>
        </article>
    );
}
