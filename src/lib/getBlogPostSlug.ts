export function getBlogPostSlug(orig_slug: string) {
	const [year, month, day, ...rest] = orig_slug.split("-");
	const slug = `${year}/${month}/${day}/${rest.join("-")}`;
	return slug;
}
