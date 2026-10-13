import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-primary px-4 pt-32 pb-20 text-center text-white">
      <div className="max-w-xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/70">Error 404</p>
        <h1 className="font-heading text-4xl font-bold md:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg text-white/85">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Button
          asChild
          className="mt-8 h-12 rounded-full bg-white px-8 font-bold text-primary hover:bg-white/90"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-5 w-5" aria-hidden="true" />
            Back to home
          </Link>
        </Button>
      </div>
    </section>
  );
}
