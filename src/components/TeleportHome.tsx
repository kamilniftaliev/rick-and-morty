import { Link } from "expo-router";

export function TeleportHome() {
  return (
    <Link
      href="/"
      className="w-2/3 px-5 py-2 text-xl font-medium text-center text-white bg-green-700 border-2 border-green-900 rounded-full"
    >
      Teleport Home
    </Link>
  );
}
