export default function formatFriendlyDate(date: Date): string {
    const now = new Date();
  
    const isToday = date.toDateString() === now.toDateString();
  
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();
  
    const daysAgo = Math.floor((+now - +date) / (1000 * 60 * 60 * 24));
  
    const time = date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  
    if (isToday) {
      return `Today, ${time}`;
    } else if (isYesterday) {
      return `Yesterday, ${time}`;
    } else if (daysAgo < 7) {
      const weekday = date.toLocaleDateString([], { weekday: 'long' });
      return `${weekday}, ${time}`;
    } else {
      const fullDate = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      return `${fullDate}, ${time}`;
    }
  }
  