import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Book, Clock, Plus } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: DashboardPage,
});

function DashboardPage() {
  // Placeholder user name - will be replaced with real user data later
  const userName = "Jane Doe";

  // Empty array for now - will show content when scrapbooks are actually created
  const recentScrapbooks: Array<{
    id: string;
    title: string;
    pageCount: number;
    lastAccessed: string;
  }> = [];
  return (
    <div className="space-y-8">
      {/* Welcome Message */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome, {userName}!
        </h1>
        <p className="text-muted-foreground text-lg">
          Ready to embrace your whimsy?
        </p>
      </div>

      {/* Recent Scrapbooks Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Clock className="h-6 w-6 text-primary" />
            Recents
          </h2>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Link to="/app/scrapebooks">
              <Plus className="h-4 w-4 mr-2" />
              New Scrapbook
            </Link>
          </Button>
        </div>

        {/* Show content only when scrapbooks exist */}
        {recentScrapbooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentScrapbooks.map((scrapbook) => (
              <Card
                key={scrapbook.id}
                className="hover:shadow-md transition-shadow cursor-pointer border-border bg-card"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Book className="h-5 w-5 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {scrapbook.pageCount} pages
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardTitle className="text-lg text-card-foreground mb-2">
                    {scrapbook.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    Last accessed {scrapbook.lastAccessed}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty state when no scrapbooks exist */
          <Card className="text-center py-12 border-dashed border-2 border-muted">
            <CardContent>
              <Book className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No recent scrapbooks
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Let's start your creation journey!!!
              </p>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link to="/app/scrapebooks">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Scrapbook
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
