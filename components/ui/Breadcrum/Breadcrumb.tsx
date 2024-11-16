import Link from "next/link";

interface Props {
  page: string;
}

export const Breadcrumb = ({ page }: Props) => {
  return (
    <div className="w-full h-[400px] bg-gray-200 items-center justify-center flex flex-col gap-4 shadow-redcoach-lg mt-[50px]">
      <h2 className="text-6xl font-bold">{page}</h2>
      <div>
        <p className="font-semibold">
          <Link href={"/"} className="hover:text-gold transition-all">
            Inicio
          </Link>{" "}
          - <span className="text-gold font-semibold">{page}</span>
        </p>
      </div>
    </div>
  );
};
