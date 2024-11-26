interface Props {
  className?: string;
}

export const FilterIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
    >
      <path
        d="M7.91669 11.6666C9.2974 11.6666 10.4167 12.7859 10.4167 14.1666C10.4167 15.5474 9.2974 16.6666 7.91669 16.6666C6.53598 16.6666 5.41669 15.5474 5.41669 14.1666C5.41669 12.7859 6.53598 11.6666 7.91669 11.6666Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12.0833 3.33332C10.7026 3.33332 9.58331 4.4526 9.58331 5.83332C9.58331 7.21403 10.7026 8.33332 12.0833 8.33332C13.464 8.33332 14.5833 7.21403 14.5833 5.83332C14.5833 4.4526 13.464 3.33332 12.0833 3.33332Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12.5 14.1321L18.3333 14.1321"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M7.5 5.79874L1.66667 5.79874"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M1.66669 14.1321L3.33335 14.1321"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18.3333 5.79874L16.6666 5.79874"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
