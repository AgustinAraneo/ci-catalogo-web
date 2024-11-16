interface Props {
  className?: string;
  stroke?: number;
}

export const AltArrowIcon: React.FC<Props> = ({ className, stroke = 1.5 }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'>
      <path
        d='M15 19L9 12L15 5'
        stroke='currentColor'
        strokeWidth={stroke}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
