"use client";
import { motion } from "framer-motion";
import { messageNotifications } from "@/lib/mockData";
import NotificationItem from "../components/notificaiton-item";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const MessagesNotification = () => (
  <motion.div
    className="bg-white"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {messageNotifications.map((item) => (
      <NotificationItem key={item.id} item={item} />
    ))}
  </motion.div>
);

export default MessagesNotification; 


 