export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        {/* <div className="mb-4 flex space-x-4"> */}
        {/*   <SocialIcon kind="github" href={siteMetadata.github} size={5} /> */}
        {/*   <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} /> */}
        {/* </div> */}
        <div className="mb-8 flex space-x-2 text-sm text-gray-900 dark:text-gray-200">
          <div>show-me-the-rsu</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  );
}
