"use client";

import { CommentProps } from "@/types/components";
import { CommentContainer } from "./comment-container";
import { twMerge } from "tailwind-merge";
import { FiTrash } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";

export function Comment({
  comment,
  handleCommentDelete,
  handleCommentUpdate,
}: CommentProps) {
  const { data: session } = useSession();

  const formattedPublicationDate = new Date(comment?.createdAt)
    .toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", " às");

  return (
    <CommentContainer className="flex flex-col gap-[11px]">
      <div className="flex justify-between items-center gap-4">
        <div
          className={twMerge("flex items-center gap-[15px]", "max-sm:flex-col")}
        >
          <span
            className={twMerge(
              "bg-light-gray py-[5px] px-[11px] rounded-[4px]",
              "text-bg-black text-[12px]",
              "max-sm:text-[10px]"
            )}
          >
            {comment.userName}
          </span>

          {comment.userEmail === session?.user?.email && (
            <>
              <div
                className={twMerge(
                  "flex items gap-[15px]",
                  "max-sm:self-start"
                )}
              >
                <FiTrash
                  onClick={() => handleCommentDelete(comment)}
                  className={twMerge(
                    "stroke-red w-[20px] h-[20px] cursor-pointer",
                    "max-sm:h-[18px] max-sm:w-[18px]"
                  )}
                />
                <FaRegEdit
                  onClick={() => handleCommentUpdate(comment)}
                  className={twMerge(
                    "fill-bg-blue w-[20px] h-[20px] cursor-pointer",
                    "max-sm:h-[18px] max-sm:w-[18px]"
                  )}
                />
              </div>
            </>
          )}
        </div>

        <span
          className={twMerge(
            "self-end italic text-[14px]",
            "max-sm:text-[10px] max-sm:self-start max-sm:mt-[5px]"
          )}
        >
          Publicado em{" "}
          <time dateTime={comment?.createdAt}>
            {formattedPublicationDate}h.
          </time>
        </span>
      </div>

      <div>
        <p
          className={twMerge(
            "break-all",
            "max-md:text-[14px] max-sm:text-[12px]"
          )}
        >
          {comment.comment}
        </p>
      </div>
    </CommentContainer>
  );
}
