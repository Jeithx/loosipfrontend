import { Bell } from "lucide-react";

export function NoNotifications() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-pink-50 rounded-full p-6 mb-4">
        <Bell className="w-10 h-10 text-pink-400" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-1">
        No Notifications
      </h2>
      <p className="text-gray-500 text-xl max-w-xs text-center">
        You're all caught up! When you have notifications, they'll show up here.
      </p>
    </div>
  );
}
