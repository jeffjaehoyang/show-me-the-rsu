export default function Footer() {
  return (
    <footer>
      <div className="flex flex-col items-center mt-16">
        {/* <div className="flex mb-4 space-x-4"> */}
        {/*   <SocialIcon kind="github" href={siteMetadata.github} size={5} /> */}
        {/*   <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} /> */}
        {/* </div> */}
        <div className="flex mb-8 space-x-2 text-sm">
          <div>rsu.watch</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
}
