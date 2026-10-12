import { Link } from "wouter";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] w-full flex items-center justify-center bg-background px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Compass className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-heading text-5xl font-black text-primary mb-4">404</h1>
        <h2 className="text-xl font-semibold text-foreground mb-3">Page Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get you back on course.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-8 h-12">
          <Link href="/">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
