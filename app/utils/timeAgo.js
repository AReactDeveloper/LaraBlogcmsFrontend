export const timeAgo = (input) => {
    const date = new Date(input);
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const units = [
      ['year', 31536000],
      ['month', 2592000],
      ['week', 604800],
      ['day', 86400],
      ['hour', 3600],
      ['minute', 60],
      ['second', 1],
    ];
  
    for (const [unit, sec] of units) {
      const diff = Math.floor(seconds / sec);
      if (diff >= 1) return rtf.format(-diff, unit);
    }
  
    return 'just now';
  };
  