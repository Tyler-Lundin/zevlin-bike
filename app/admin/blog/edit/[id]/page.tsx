import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PostForm from "../../components/PostForm";
import { updatePost } from "../../actions";
import { BlogPost } from "@/lib/schema";

async function getPostById(id: string): Promise<BlogPost | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching post by id:", error);
    return null;
  }
  return data;
}

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
      <PostForm action={updatePost} post={post} />
    </div>
  );
}
