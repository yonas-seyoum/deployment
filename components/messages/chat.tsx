"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useSocket } from "@/context/SocketProvider";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { User } from "@/app/types";
import { ChatApi, Room } from "@/app/api/chat";

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
  createdAt: Date;
  readAt: null;
}

export default function Chat({
  room,
  initialMessages,
  profile,
}: {
  room: Room;
  initialMessages: Message[];
  profile: any;
}) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [receiverId, setReceiverId] = useState<string>("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();

  useEffect(() => {
    setMessages(initialMessages);

    const receiver = room?.participants.find(
      (participant) => participant.user?.id != profile.id
    );

    if (receiver) {
      setReceiverId(receiver.user?.id!);
    }
    setTimeout(() => bottomRef.current?.scrollIntoView(), 50);
  }, [room, initialMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (msg: Message) => {
      if (msg.conversationId === room.id) {
        setMessages((prev) => [...prev, msg]);
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, room]);

  const sendMessage = () => {
    if (!text.trim() || !socket) return;

    const tempMessage: Message = {
      id: Date.now().toString(),
      senderId: profile.id,
      receiverId: receiverId,
      conversationId: room.id,
      content: text,
      createdAt: new Date(),
      readAt: null,
    };

    socket.emit("sendMessage", tempMessage);

    setText("");
  };

  const editMessage = () => {};

  const deleteMessage = () => {};

  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 hide-scroll bg-card ">
        {messages.map((msg) => {
          return (
            <>
              {msg.senderId === profile.id ? (
                <ContextMenu>
                  <ContextMenuTrigger key={msg.id}>
                    <MessageBubble
                      key={msg.id}
                      message={msg}
                      profile={profile}
                    />
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem inset>
                      Edit
                      <ContextMenuShortcut>
                        <IconEdit />
                      </ContextMenuShortcut>
                    </ContextMenuItem>
                    <ContextMenuItem inset>
                      Delete
                      <ContextMenuShortcut>
                        <IconTrash />
                      </ContextMenuShortcut>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ) : (
                <MessageBubble key={msg.id} message={msg} profile={profile} />
              )}
            </>
          );
        })}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-border bg-card  px-4 py-4 rounded-b-md">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="rounded-full bg-background  border-border"
          />

          <Button
            onClick={sendMessage}
            className="rounded-full p-2 w-10 h-10 bg-[#4d32fb] hover:bg-[#4d32fb]/90 dark:bg-[#4d32fb] dark:hover:bg-[#4d32fb]/90"
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </>
  );
}

interface MessageBubbleProps {
  message: Message;
  profile: User;
}

export function MessageBubble({ message, profile }: MessageBubbleProps) {
  const isSender = message.senderId === profile.id;

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs rounded-2xl px-4 py-2 mb-3 ${
          isSender
            ? "bg-[#4d32fb] text-white dark:bg-[#4d32fb] dark:text-white"
            : "bg-card dark:bg-white/10 border border-border dark:border-white/20 text-foreground dark:text-white"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <p
          className={`mt-1 text-xs ${
            isSender
              ? "opacity-80 dark:opacity-80"
              : "opacity-70 dark:opacity-60"
          }`}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
