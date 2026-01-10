import { Room } from "@/app/api/chat";
import { User } from "@/app/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function ProfileSection({
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
    <div className="hidden lg:flex w-72 flex-col border-l border-border bg-card">
      <div className="border-b px-6 py-6 flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage
            className="relative group cursor-pointer object-cover"
            src={reciever.profilePicture || "/placeholder-avatar.png"}
            alt="Profile"
          />
          <AvatarFallback>{reciever.fullName?.[0]}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <p className="text-base font-semibold">
            {reciever.fullName || reciever.companyName}
          </p>
          <p className="text-sm text-muted-foreground">
            {reciever.profession || reciever.industry}
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <h3 className="text-xs font-semibold uppercase mb-2 text-muted-foreground">
          About
        </h3>
        <p className="text-sm">
          {reciever.summary ||
            reciever.bio ||
            reciever.companyDescription ||
            "No bio available"}
        </p>
      </div>
    </div>
  );
}
