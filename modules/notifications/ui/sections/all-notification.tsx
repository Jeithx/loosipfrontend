"use client";
import { notifications } from "@/lib/mockData";
import { motion } from "framer-motion";
import { NoNotifications } from "../components/not-notification";
import NotificationItem from "../components/notificaiton-item";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const AllNotification = () => {
  return (
    <motion.div
      className="bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <NotificationItem key={notification.id} item={notification} />
        ))
      ) : (
        <NoNotifications />
      )}
    </motion.div>
  );
};

export default AllNotification;
