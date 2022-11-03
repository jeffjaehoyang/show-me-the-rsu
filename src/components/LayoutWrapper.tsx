import { ReactNode } from 'react';

// import Logo from "@/data/logo.svg";
import Footer from './Footer';
import Link from './Link';
import SectionContainer from './SectionContainer';

interface Props {
  children: ReactNode;
}

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className="flex flex-col justify-between h-screen">
        <header className="flex items-center justify-between pt-5 pb-10">
          <div>
            <Link
              href="/"
              aria-label={'rsu.watch'}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className="flex items-center justify-between">
                {/* <div className="mr-3"> */}
                {/*   <Logo /> */}
                {/* </div> */}
                <div className="hidden font-extrabold text-md sm:block">
                  rsu.watch
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
