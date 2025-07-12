export const calculateAgo = (createdAt) => {
    const diff = Date.now() - new Date(createdAt).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} days`;
    if (hours > 0) return `${hours} hours`;
    if (minutes > 0) return `${minutes} minutes`;
    return `${seconds} seconds`;
  };