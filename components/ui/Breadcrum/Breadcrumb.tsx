import Link from "next/link";

export const Breadcrumb = ({ page }: { page: string }) => {
  return (
    <div className="w-full h-[450px] bg-gray-200 items-center justify-center flex flex-col gap-4 shadow-redcoach-lg">
      <h2 className="text-6xl sm:text-3xl text-center font-bold">{page}</h2>
      <div className="text-center">
        <p className="font-semibold text-base sm:text-sm">
          <Link href={"/"} className="hover:text-gold transition-all">
            Inicio
          </Link>{" "}
          - <span className="text-gold font-semibold">{page}</span>
        </p>
      </div>
    </div>
  );
};
