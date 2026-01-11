"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChatApi, Room } from "@/app/api/chat";
import { ProfileApi } from "@/app/api/profile";
import { useSocket } from "@/context/SocketProvider";
import RoomList from "@/components/messages/room-list";
import Chat from "@/components/messages/chat";
import { useSearchParams } from "next/navigation";
import MessagesSkeleton from "@/components/messages/skeleton/messages-skeleton";
import ChatHeader from "@/components/messages/chat-header";
import ProfileSection from "@/components/messages/profile-section";
import EmptyChatState from "@/components/messages/empty-chat-state";

export default function Messages() {
  const [activeRoom, setActiveRoom] = useState<Room>();
  const { socket } = useSocket();

  const searchParam = useSearchParams();

  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: ProfileApi.getProfile,
  });

  const { data: rooms, isLoading: loadingRooms } = useQuery({
    queryKey: ["rooms"],
    queryFn: ChatApi.getRooms,
  });

  useEffect(() => {
    if (rooms && rooms.length > 0 && !activeRoom) {
      const roomId = searchParam.get("roomId");
      if (roomId) {
        const activeRoom = rooms.find((room) => room.applicationId === roomId);
        setActiveRoom(activeRoom);
        socket?.emit("joinRoom", { conversationId: activeRoom?.id });
      } else {
        setActiveRoom(rooms[0]);
        socket?.emit("joinRoom", { conversationId: rooms[0].id });
      }
    }
  }, [searchParam, rooms, activeRoom, socket]);

  const handleRoomSelection = (room: Room) => {
    setActiveRoom(room);
    socket?.emit("joinRoom", { conversationId: room.id });
  };

  if (loadingProfile || loadingRooms || !profile || !rooms) {
    return <MessagesSkeleton />;
  }

  return (
    <div className="flex gap-4 h-full overflow-hidden">
      <RoomList
        rooms={rooms}
        profile={profile}
        activeRoomId={activeRoom?.id}
        onSelectRoom={handleRoomSelection}
      />

      {activeRoom && (
        <div className="flex-1 flex flex-col">
          <ChatHeader room={activeRoom} profile={profile} />

          <Chat
            key={activeRoom.id}
            room={activeRoom}
            initialMessages={activeRoom.messages}
            profile={profile}
          />
        </div>
      )}

      {activeRoom && <ProfileSection room={activeRoom} profile={profile} />}
      {!activeRoom && <EmptyChatState />}
    </div>
  );
}
