import { getPosts } from "@/actions/post.action";
import { getDbUserId } from "@/actions/user.action";
import CreatePost from "@/components/CreatePost";
import PostCard from "@/components/PostCard";
import WhoToFollow from "@/components/WhoToFollow";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const posts = await getPosts();
  const dbUserId = await getDbUserId();

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Create Post Section */}
          {user && (
            <div className="bg-card rounded-xl shadow-sm transition-shadow hover:shadow-md">
              <CreatePost />
            </div>
          )}

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-card rounded-xl shadow-sm transition-all hover:shadow-xl">
                <PostCard post={post} dbUserId={dbUserId} />
              </div>
            ))}
            {posts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p className="text-lg font-semibold">No posts yet</p>
                <p className="text-sm">Be the first one to post something!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:col-span-4 space-y-6">
          <div className="sticky top-20">
            <div className="bg-card rounded-xl shadow-sm">
              <WhoToFollow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
