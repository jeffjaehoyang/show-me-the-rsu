import { ReactNode } from "react";
// import Logo from "@/data/logo.svg";
import Link from "./Link";
import SectionContainer from "./SectionContainer";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className="flex h-screen flex-col justify-between">
        <header className="flex items-center justify-between pt-5 pb-10">
          <div>
            <Link
              href="/"
              aria-label={"Show Me The RSU"}
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <div className="flex items-center justify-between">
                {/* <div className="mr-3"> */}
                {/*   <Logo /> */}
                {/* </div> */}
                <div className="text-md hidden font-extrabold sm:block">
                  show me the rsu
                </div>
              </div>
            </Link>
          </div>
          {/* <div className="flex items-center text-sm leading-5"> */}
          {/*   <div className="hidden sm:block"> */}
          {/*     {headerNavLinks.map((link) => ( */}
          {/*       <NavLink key={link.title} href={link.href}> */}
          {/*         {link.title} */}
          {/*       </NavLink> */}
          {/*     ))} */}
          {/*   </div> */}
          {/*   <MobileNav /> */}
          {/* </div> */}
        </header>
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  );
};

export default LayoutWrapper;
