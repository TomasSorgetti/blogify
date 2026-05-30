import { DocsSidebar } from "./docs-sidebar";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 pt-24 pb-16 lg:px-8">
        <div className="flex gap-12">
          <DocsSidebar />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
