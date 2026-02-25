export type BlogArticle = {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  href?: string;
};

export const blogArticles: BlogArticle[] = [
  {
    id: "1",
    title: "Starting and Growing a Career in Web Design",
    description:
      "Practical advice for designers who want to transition into web design and build a sustainable career.",
    date: "Apr 8, 2022",
    readTime: "6 min read",
    href: "#",
  },
  {
    id: "2",
    title: "Building Design Systems That Scale",
    description:
      "How to create and maintain design systems that work across multiple products and teams.",
    date: "Mar 15, 2022",
    readTime: "8 min read",
    href: "#",
  },
];
