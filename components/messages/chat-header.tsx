import { Room } from "@/app/api/chat";
import { Button } from "../ui/button";
import { User } from "@/app/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MoreVertical } from "lucide-react";

export default function ChatHeader({
  room,
  profile,
}: {
  room: Room;
  profile: User;
}) {
  const reciever = room.participants.find(
    (p) => p.user?.id !== profile.id
  )?.user;
  if (!reciever) return null;

  return (
    <div className="border-b px-4 py-4 flex items-center justify-between bg-card">
      <div className="flex items-center gap-3">
        <div
          className="relative group cursor-pointer"
          style={{ width: 40, height: 40 }}
        >
          <Avatar className="w-full h-full rounded-full overflow-hidden">
            <AvatarImage
              className="relative group cursor-pointer object-cover"
              style={{ width: 40, height: 40 }}
              src={reciever.profilePicture || "/placeholder-avatar.png"}
              alt="Profile"
            />
            <AvatarFallback>
              {reciever.fullName?.[0] || reciever.companyName?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>
        <p className="text-sm font-medium">
          {reciever.fullName || reciever.companyName}
        </p>
      </div>
      <Button variant="ghost" size="icon">
        <MoreVertical className="h-5 w-5" />
      </Button>
    </div>
  );
}
