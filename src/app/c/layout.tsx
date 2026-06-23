import "./card.css";

/**
 * Layout for the /c card route.
 *
 * Wraps every card page in a `.fde-stage` scope container. ALL card-specific
 * CSS variables and `.fde-*` selectors live under `.fde-stage` (see card.css),
 * so the holographic card styling never leaks into the landing page at `/`.
 * card.css is imported here so it only loads on the /c route.
 */
export default function CardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="fde-stage">{children}</div>;
}
