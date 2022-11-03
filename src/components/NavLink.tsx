/* eslint-disable jsx-a11y/anchor-has-content */
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLink = ({
  href,
  ...rest
}: DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>) => {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a
        className={cn(
          isActive
            ? "font-semibold text-gray-800 dark:text-gray-200"
            : "font-normal text-gray-600 dark:text-gray-400",
          "hidden rounded-lg p-1 transition-all hover:bg-gray-200 dark:hover:bg-gray-800 sm:px-3 sm:py-2 md:inline-block"
        )}
        {...rest}
      />
    </Link>
  );
};

export default NavLink;
