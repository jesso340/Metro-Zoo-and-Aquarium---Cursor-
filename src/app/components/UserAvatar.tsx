import { USER_AVATAR_ALT, USER_AVATAR_SRC } from "../constants/userAvatar";

const sizeClass = {
  sm: "w-8 h-8 min-w-[2rem] min-h-[2rem]",
  md: "w-10 h-10 min-w-[2.5rem] min-h-[2.5rem]",
  lg: "w-12 h-12 min-w-[3rem] min-h-[3rem]",
} as const;

type UserAvatarProps = {
  className?: string;
  size?: keyof typeof sizeClass;
};

export function UserAvatar({ className = "", size = "sm" }: UserAvatarProps) {
  return (
    <img
      src={USER_AVATAR_SRC}
      alt={USER_AVATAR_ALT}
      className={`${sizeClass[size]} rounded-full object-cover border border-neutral-200/80 shadow-sm shrink-0 bg-[#E8EAED] ${className}`}
    />
  );
}
