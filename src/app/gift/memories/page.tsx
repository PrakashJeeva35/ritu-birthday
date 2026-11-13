import { MemoriesRoom } from "@/components/memories/MemoriesRoom";
import { RoomShell } from "@/components/gift/RoomShell";

export default function MemoriesPage() {
  return (
    <RoomShell id="memories">
      <MemoriesRoom />
    </RoomShell>
  );
}
