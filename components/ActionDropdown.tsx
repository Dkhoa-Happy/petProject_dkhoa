import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Post } from "@/module/post/interface";
import { actionsDropdownItems } from "@/constants";
import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { useToast } from "@/hooks/use-toast";

interface ActionDropdownProps {
  post: Post;
  onDeleteSuccess?: () => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  post,
  onDeleteSuccess,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
  };

  const handleAction = async () => {
    if (!action) return;
    let success = false;
    setIsLoading(true);

    try {
      if (action.value === "delete") {
        // API call to delete the post
        await api.delete(`/posts/${post.id}`);
        console.log(`Post deleted: ${post.id}`);

        // Trigger success callback if provided
        if (onDeleteSuccess) onDeleteSuccess();

        toast: ({
          title: "Success",
          description: "Post deleted successfully",
        });
        closeAllModals();
      } else if (action.value === "update") {
        console.log(`Post updated: ${post.id}`);
      }

      closeAllModals();
    } catch (error) {
      console.error("An error occurred while performing the action:", error);
      toast: ({
        title: "Error",
        description: console.log(
          "An error occurred while performing the action:",
          error,
        ),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderDialogContent = () => {
    if (!action) return null;

    return (
      <DialogContent>
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle className="text-center">{action.label}</DialogTitle>

          {action.value === "delete" && (
            <p className="text-center">
              Are you sure you want to delete{" "}
              <span className="font-bold">{post.title}</span>?
            </p>
          )}
        </DialogHeader>

        <DialogFooter className="flex flex-col gap-3 md:flex-row">
          <Button
            onClick={closeAllModals}
            variant="secondary"
            className="modal-cancel-button"
          >
            Cancel
          </Button>
          <Button
            onClick={handleAction}
            disabled={isLoading}
            variant="destructive"
            className="modal-submit-button"
          >
            {isLoading ? (
              <Image
                src="/icons/loader2.svg"
                alt="Loading..."
                width={24}
                height={24}
                className="animate-spin"
              />
            ) : (
              action.label
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger>
          <Image src="/icons/dots.svg" alt="Options" width={34} height={34} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">
            {post.title}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="shad-dropdown-item"
              onClick={() => {
                setAction(actionItem);
                if (["update", "delete"].includes(actionItem.value)) {
                  setIsModalOpen(true);
                }
              }}
            >
              <div className="flex items-center gap-2">
                <Image
                  src={actionItem.icon}
                  alt={actionItem.label}
                  width={30}
                  height={30}
                />
                {actionItem.label}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
