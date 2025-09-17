"use client";
import { motion } from "framer-motion";
import { likesNotifications } from "@/lib/mockData";
import NotificationItem from "../components/notificaiton-item";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const LikesNotification = () => (
  <motion.div
    className="bg-white"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {likesNotifications.map((item) => (
      <NotificationItem key={item.id} item={item} />
    ))}
  </motion.div>
);

export default LikesNotification;
