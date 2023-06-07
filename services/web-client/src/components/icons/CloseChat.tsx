type CloseChatProps = {
  handleClick: () => void;
};

export const CloseChatIcon = ({ handleClick }: CloseChatProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      onClick={handleClick}
    >
      <rect width="24" height="24" fill="#fff" rx="12" />
      <path
        fill="#181B1D"
        fillRule="evenodd"
        d="M10.293 16.707a1 1 0 0 1 0-1.414L13.586 12l-3.293-3.293a1 1 0 1 1 1.414-1.414L16.414 12l-4.707 4.707a1 1 0 0 1-1.414 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
