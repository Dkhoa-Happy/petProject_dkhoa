import React from "react";
import SearchForm from "@/components/SearchForm";
import PostList from "@/module/post/components/PostList";

interface SearchParams {
  query?: string;
}

const Home = ({ searchParams }: { searchParams: SearchParams }) => {
  const query = searchParams?.query || "";

  return (
    <>
      <section className="blue_container">
        <h1 className="heading">
          Manage Your Post, <br />
          Connect with People
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit your post and connect with people from around the world.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Posts"}
        </p>
        <PostList query={query} />
      </section>
    </>
  );
};

export default Home;
