"use client";

import React, { useState } from "react";
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
import { Post } from "@/modules/post/interface";
import { actionsDropdownItems, confirmDeleteTest } from "@/constants";
import { Button } from "@/components/ui/button";
import api from "@/api/axios";
import { toast } from "sonner";
import ActionsModalContent from "@/components/ActionsModalContent";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const closeAllModals = () => {
    if (isLoading) return;
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
        await api.delete(`/posts/${post.id}`);
        console.log(`Post deleted: ${post.id}`);

        if (onDeleteSuccess) onDeleteSuccess();

        toast.success("Post deleted successfull.");
        closeAllModals();
      } else if (action.value === "update") {
        console.log(`Post updated: ${post.id}`);
      }

      closeAllModals();
    } catch (error) {
      console.error("An error occurred while performing the action:", error);
      toast.error("An error occurred while performing the action");
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdate = async (data: Post) => {
    setIsLoading(true);
    try {
      await api.put(`/posts/${post.id}`, data);
      toast.success("Post updated successfully.");
      closeAllModals();
    } catch (e) {
      console.error("An error occurred while performing the action:", e);
      toast.error("Failed to update the post.");
    } finally {
      setIsLoading(false);
      closeAllModals();
    }
  };

  const renderDialogContent = () => {
    if (!action) return null;

    return (
      <>
        <DialogContent
          className=" rounded-[26px] w-[90%] max-w-[400px] px-6 py-8 shadow-lg"
          aria-describedby="dialog-description"
        >
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle className="text-center text-lg font-bold">
              {action.label}
            </DialogTitle>

            {action.value === "delete" && (
              <p className="text-center text-gray-700">
                {confirmDeleteTest}{" "}
                <span className="font-bold">{post.title}</span>?
              </p>
            )}

            {action.value === "update" &&
              (() => {
                router.push(`/posts/update`);
                return null;
              })()}
          </DialogHeader>
          {action.value === "delete" && (
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
          )}
        </DialogContent>
      </>
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
