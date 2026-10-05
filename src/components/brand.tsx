import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href="/" aria-label="Shreera home" className="inline-flex shrink-0 items-center">
      <Image src="/images/shreera-logo.png" alt="Shreera — Crafted for the woman you are" width={1959} height={803} priority className="h-10 w-[136px] object-contain sm:h-12 sm:w-[156px]" />
    </Link>
  );
}
