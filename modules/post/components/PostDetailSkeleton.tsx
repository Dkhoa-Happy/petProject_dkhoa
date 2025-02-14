import { Skeleton } from "@/components/ui/skeleton";

export const PostDetailSkeleton = () => {
  return (
    <>
      <section className="blue_container !min-h-[230px] flex flex-col justify-center items-start space-y-4">
        <Skeleton className="h-6 w-24" /> {/* Date tag */}
        <Skeleton className="h-12 w-3/4" /> {/* Title */}
      </section>
      <section className="section_container space-y-8">
        <Skeleton className="w-full h-[400px] rounded-xl" /> {/* Post image */}
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <div className="flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" /> {/* Avatar */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" /> {/* Name */}
                <Skeleton className="h-4 w-48" /> {/* Email */}
              </div>
            </div>
            <Skeleton className="h-8 w-20" /> {/* Category tag */}
          </div>
          <Skeleton className="h-8 w-48" /> {/* "Post Detail" heading */}
          {/* Post content */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Skeleton className="h-px w-full my-8" /> {/* Divider */}
        {/* Comment list skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-40" /> {/* "Comments" heading */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-start space-x-4">
              <Skeleton className="w-10 h-10 rounded-full" />{" "}
              {/* Comment avatar */}
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" /> {/* Commenter name */}
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PostDetailSkeleton;
