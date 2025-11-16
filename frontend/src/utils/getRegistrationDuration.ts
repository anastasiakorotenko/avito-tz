export const getRegistrationDuration = (registeredAt: string | undefined) => {
  if (registeredAt == undefined) return 'Некорректная дата';
  
  const dateRegistered = new Date(registeredAt);
  const now = new Date();

  const days = Math.floor(
    (now.getTime() - dateRegistered.getTime()) / (1000 * 3600 * 24)
  );

  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) {
    return years === 1
      ? "1 год"
      : years > 1 && years < 5
      ? `${years} года`
      : `${years} лет`;
  }

  if (months >= 1) {
    return months === 1
      ? "1 месяц"
      : months > 1 && months < 5
      ? `${months} месяца`
      : `${months} месяцев`;
  }

  return days === 1
    ? "1 день"
    : (days >= 2 && days <= 4) || (days >= 22 && days <= 24)
    ? `${days} дня`
    : `${days} дней`;
};
