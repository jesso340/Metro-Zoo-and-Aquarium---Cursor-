import { useState } from "react";
import { motion } from "motion/react";
import { Bell, Gift, Calendar, TrendingUp, Check, Trash2, Video } from "lucide-react";
import { notifications as initialNotifications, Notification } from "../data/mockData";
import { Link } from "react-router";

export function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "event":
        return Calendar;
      case "new_benefit":
        return Gift;
      case "reminder":
        return Bell;
      case "milestone":
        return TrendingUp;
      case "video":
        return Video;
    }
  };

  const getColor = (type: Notification["type"]) => {
    switch (type) {
      case "event":
        return "bg-blue-100 text-blue-600";
      case "new_benefit":
        return "bg-purple-100 text-purple-600";
      case "reminder":
        return "bg-orange-100 text-orange-600";
      case "milestone":
        return "bg-green-100 text-green-600";
      case "video":
        return "bg-red-100 text-red-600";
    }
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-900 mb-2">Notifications</h1>
          <p className="text-neutral-600">Stay updated on new benefits and events</p>
        </div>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      </div>

      {/* Mark All as Read Button */}
      {unreadCount > 0 && (
        <div className="flex justify-end">
          <button
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Check size={16} />
            Mark all as read
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl p-12 text-center shadow-sm border border-neutral-200"
          >
            <Bell size={48} className="mx-auto text-neutral-300 mb-4" />
            <h3 className="font-semibold text-neutral-900 mb-2">You're all caught up!</h3>
            <p className="text-neutral-600">No new notifications at the moment</p>
          </motion.div>
        ) : (
          notifications.map((notification, index) => {
            const Icon = getIcon(notification.type);
            const colorClass = getColor(notification.type);
            const isLivestream = notification.id === "1" && notification.type === "video";

            const notificationContent = (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-xl p-5 shadow-sm border transition-all ${
                  notification.read
                    ? "border-neutral-200"
                    : "border-indigo-300 bg-indigo-50/30"
                } ${isLivestream ? "hover:shadow-md cursor-pointer" : ""}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                    <Icon size={20} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className={`font-semibold ${notification.read ? "text-neutral-700" : "text-neutral-900"}`}>
                        {notification.title}
                      </h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className={`text-sm mb-2 ${notification.read ? "text-neutral-500" : "text-neutral-600"}`}>
                      {notification.description}
                    </p>
                    <div className="text-xs text-neutral-400">{notification.time}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleMarkAsRead(notification.id);
                        }}
                        className="p-2 text-neutral-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check size={16} />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleDelete(notification.id);
                      }}
                      className="p-2 text-neutral-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            );

            // Wrap livestream notification with Link
            if (isLivestream) {
              return (
                <Link key={notification.id} to="/livestream/baby-penguin-hatching">
                  {notificationContent}
                </Link>
              );
            }

            return notificationContent;
          })
        )}
      </div>

      {/* Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-neutral-50 rounded-xl p-6 border border-neutral-200"
      >
        <h3 className="font-semibold text-neutral-900 mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="font-medium text-neutral-900">New Benefits</div>
              <div className="text-sm text-neutral-600">Get notified when new perks are added</div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="font-medium text-neutral-900">Upcoming Events</div>
              <div className="text-sm text-neutral-600">Reminders for events you're attending</div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="font-medium text-neutral-900">Unused Perks</div>
              <div className="text-sm text-neutral-600">Reminders about benefits you haven't used</div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <div className="font-medium text-neutral-900">Milestones</div>
              <div className="text-sm text-neutral-600">Celebrate your achievements and progress</div>
            </div>
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
            />
          </label>
        </div>
      </motion.div>
    </div>
  );
}